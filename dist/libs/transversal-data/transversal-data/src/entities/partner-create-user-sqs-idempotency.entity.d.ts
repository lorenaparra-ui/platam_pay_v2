export declare class PartnerCreateUserSqsIdempotencyEntity {
    id: string;
    idempotency_key: string;
    correlation_id: string;
    result: {
        user_external_id: string;
        person_external_id: string;
    } | null;
    created_at: Date;
}
