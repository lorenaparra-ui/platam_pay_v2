import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import type {
  PartnerCreateUserCachedResult,
  PartnerCreateUserIdempotencyBeginResult,
  PartnerCreateUserSqsIdempotencyPort,
} from '@modules/users/domain/ports/partner-create-user-sqs-idempotency.port';
import { PartnerCreateUserSqsIdempotencyEntity } from '@app/transversal-data';

const PG_UNIQUE_VIOLATION = '23505';
const STALE_PROCESSING_MS = 30 * 60 * 1000;

@Injectable()
export class TypeormPartnerCreateUserSqsIdempotencyAdapter
  implements PartnerCreateUserSqsIdempotencyPort
{
  constructor(
    @InjectRepository(PartnerCreateUserSqsIdempotencyEntity)
    private readonly repo: Repository<PartnerCreateUserSqsIdempotencyEntity>,
  ) {}

  async begin(
    key: string,
    correlation_id: string,
  ): Promise<PartnerCreateUserIdempotencyBeginResult> {
    const row = this.repo.create({
      idempotency_key: key,
      correlation_id,
      result: null,
    });
    try {
      await this.repo.save(row);
      return { status: 'proceed' };
    } catch (err: unknown) {
      if (!this.is_unique_violation(err)) {
        throw err;
      }
    }
    const existing = await this.repo.findOne({
      where: { idempotency_key: key },
    });
    if (existing === null) {
      return { status: 'conflict' };
    }
    if (existing.result !== null) {
      return {
        status: 'duplicate',
        result: {
          user_external_id: existing.result.user_external_id,
          person_external_id: existing.result.person_external_id,
        },
      };
    }
    const age_ms = Date.now() - existing.created_at.getTime();
    if (age_ms > STALE_PROCESSING_MS) {
      await this.repo.delete({ idempotency_key: key });
      return this.begin(key, correlation_id);
    }
    return { status: 'conflict' };
  }

  async complete(key: string, result: PartnerCreateUserCachedResult): Promise<void> {
    await this.repo.update(
      { idempotency_key: key },
      {
        result: {
          user_external_id: result.user_external_id,
          person_external_id: result.person_external_id,
        },
      },
    );
  }

  async release(key: string): Promise<void> {
    await this.repo.delete({ idempotency_key: key });
  }

  private is_unique_violation(err: unknown): boolean {
    return err instanceof QueryFailedError && err.driverError !== undefined
      ? String((err.driverError as { code?: string }).code) === PG_UNIQUE_VIOLATION
      : false;
  }
}
