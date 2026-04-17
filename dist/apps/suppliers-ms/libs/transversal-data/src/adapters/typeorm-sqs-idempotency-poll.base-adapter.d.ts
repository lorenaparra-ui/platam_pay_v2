import { Repository } from 'typeorm';
import type { SqsIdempotencyResultPollPort } from '@platam/shared';
import type { BaseSqsIdempotencyEntity } from '../entities/base-sqs-idempotency.entity';
export type SqsIdempotencyPollConfig = Readonly<{
    timeout_ms: number;
    interval_ms: number;
}>;
export declare abstract class TypeormSqsIdempotencyPollBaseAdapter<TEntity extends BaseSqsIdempotencyEntity, TResult> implements SqsIdempotencyResultPollPort<TResult> {
    protected readonly repo: Repository<TEntity>;
    protected readonly poll_config: SqsIdempotencyPollConfig;
    constructor(repo: Repository<TEntity>, poll_config: SqsIdempotencyPollConfig);
    wait_for_completed_result(idempotency_key: string): Promise<TResult>;
    protected abstract validate_result(raw: unknown): raw is TResult;
}
