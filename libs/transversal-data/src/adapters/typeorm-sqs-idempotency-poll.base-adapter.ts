import { Repository } from 'typeorm';
import type { SqsIdempotencyResultPollPort } from '@platam/shared';
import type { BaseSqsIdempotencyEntity } from '../entities/base-sqs-idempotency.entity';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Configuración de polling para un adapter concreto.
 */
export type SqsIdempotencyPollConfig = Readonly<{
  timeout_ms: number;
  interval_ms: number;
}>;

/**
 * Implementación TypeORM genérica del patrón poll-until-complete.
 *
 * Permite que `suppliers-ms` (u otro orquestador) espere a que `transversal-ms`
 * termine de procesar un mensaje SQS asíncrono y persista su resultado en la
 * tabla de idempotencia compartida.
 *
 * Cómo extender:
 * ```ts
 * @Injectable()
 * export class TypeormMiOperacionPollAdapter
 *   extends TypeormSqsIdempotencyPollBaseAdapter<MiEntidadEntity, MiResultadoType>
 *   implements SqsIdempotencyResultPollPort<MiResultadoType>
 * {
 *   constructor(
 *     @InjectRepository(MiEntidadEntity)
 *     repo: Repository<MiEntidadEntity>,
 *     config: SqsIdempotencyPollConfig,
 *   ) {
 *     super(repo, config);
 *   }
 *
 *   protected validate_result(raw: unknown): raw is MiResultadoType {
 *     // implementar validación de campos requeridos
 *   }
 * }
 * ```
 */
export abstract class TypeormSqsIdempotencyPollBaseAdapter<
  TEntity extends BaseSqsIdempotencyEntity,
  TResult,
> implements SqsIdempotencyResultPollPort<TResult>
{
  constructor(
    protected readonly repo: Repository<TEntity>,
    protected readonly poll_config: SqsIdempotencyPollConfig,
  ) {}

  async wait_for_completed_result(idempotency_key: string): Promise<TResult> {
    const deadline = Date.now() + this.poll_config.timeout_ms;

    while (Date.now() < deadline) {
      const row = await this.repo.findOne({
        where: { idempotency_key } as never,
        select: { result: true } as never,
      });

      const raw = row?.result;
      if (raw !== null && raw !== undefined && this.validate_result(raw)) {
        return raw;
      }

      await sleep(this.poll_config.interval_ms);
    }

    throw new Error(
      `[SqsIdempotencyPoll] Tiempo de espera agotado (${this.poll_config.timeout_ms}ms) para la clave: ${idempotency_key}`,
    );
  }

  /**
   * Valida que el JSONB almacenado cumple la forma esperada de TResult.
   * Cada subclase define su propia lógica de validación.
   */
  protected abstract validate_result(raw: unknown): raw is TResult;
}
