export declare abstract class BaseSqsIdempotencyEntity {
    id: string;
    idempotency_key: string;
    correlation_id: string;
    result: unknown | null;
    created_at: Date;
}
