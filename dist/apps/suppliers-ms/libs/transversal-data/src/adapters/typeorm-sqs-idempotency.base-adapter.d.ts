import { Repository } from 'typeorm';
import type { SqsIdempotencyBeginResult, SqsIdempotencyPort } from '@platam/shared';
import type { BaseSqsIdempotencyEntity } from '../entities/base-sqs-idempotency.entity';
export declare abstract class TypeormSqsIdempotencyBaseAdapter<TEntity extends BaseSqsIdempotencyEntity, TResult> implements SqsIdempotencyPort<TResult> {
    protected readonly repo: Repository<TEntity>;
    constructor(repo: Repository<TEntity>);
    begin(key: string, correlation_id: string): Promise<SqsIdempotencyBeginResult<TResult>>;
    complete(key: string, result: TResult): Promise<void>;
    release(key: string): Promise<void>;
    private is_unique_violation;
}
