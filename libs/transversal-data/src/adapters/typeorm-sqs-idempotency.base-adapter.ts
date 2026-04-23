import { Repository, QueryFailedError } from 'typeorm';
import type {
  SqsIdempotencyBeginResult,
  SqsIdempotencyPort,
} from '@platam/shared';
import type { BaseSqsIdempotencyEntity } from '../entities/base-sqs-idempotency.entity';

const PG_UNIQUE_VIOLATION = '23505';

/**
 * Tiempo máximo que se tolera un registro en estado "en proceso" (null en result)
 * antes de considerarlo obsoleto y reiniciarlo.
 * Cubre escenarios de crash o pod reciclado durante el procesamiento.
 */
const STALE_PROCESSING_MS = 30 * 60 * 1000; // 30 minutos

/**
 * Implementación TypeORM genérica del protocolo de idempotencia SQS.
 *
 * Encapsula el ciclo completo:
 *   begin → (procesamiento de negocio) → complete / release
 *
 * Cómo extender:
 * ```ts
 * @Injectable()
 * export class TypeormMiOperacionIdempotencyAdapter
 *   extends TypeormSqsIdempotencyBaseAdapter<MiEntidadEntity, MiResultadoType>
 *   implements MiOperacionIdempotencyPort
 * {
 *   constructor(
 *     @InjectRepository(MiEntidadEntity)
 *     repo: Repository<MiEntidadEntity>,
 *   ) {
 *     super(repo);
 *   }
 * }
 * ```
 *
 * Requisitos de la entidad hija:
 *   - Debe extender `BaseSqsIdempotencyEntity`.
 *   - La columna `result` debe estar mapeada como `jsonb nullable`.
 */
export abstract class TypeormSqsIdempotencyBaseAdapter<
  TEntity extends BaseSqsIdempotencyEntity,
  TResult,
> implements SqsIdempotencyPort<TResult>
{
  constructor(protected readonly repo: Repository<TEntity>) {}

  async begin(
    key: string,
    correlation_id: string,
  ): Promise<SqsIdempotencyBeginResult<TResult>> {
    const row = this.repo.create({
      idempotency_key: key,
      correlation_id,
      result: null,
    } as unknown as TEntity);

    try {
      await this.repo.save(row);
      return { status: 'proceed' };
    } catch (err: unknown) {
      if (!this.is_unique_violation(err)) {
        throw err;
      }
    }

    const existing = await this.repo.findOne({
      where: { idempotency_key: key } as never,
    });

    if (existing === null) {
      return { status: 'conflict' };
    }

    if (existing.result !== null && existing.result !== undefined) {
      return { status: 'duplicate', result: existing.result as TResult };
    }

    const age_ms = Date.now() - existing.created_at.getTime();
    if (age_ms > STALE_PROCESSING_MS) {
      await this.repo.delete({ idempotency_key: key } as never);
      return this.begin(key, correlation_id);
    }

    return { status: 'conflict' };
  }

  async complete(key: string, result: TResult): Promise<void> {
    await this.repo.update(
      { idempotency_key: key } as never,
      { result } as never,
    );
  }

  async release(key: string): Promise<void> {
    await this.repo.delete({ idempotency_key: key } as never);
  }

  private is_unique_violation(err: unknown): boolean {
    return err instanceof QueryFailedError && err.driverError !== undefined
      ? String((err.driverError as { code?: string }).code) === PG_UNIQUE_VIOLATION
      : false;
  }
}
