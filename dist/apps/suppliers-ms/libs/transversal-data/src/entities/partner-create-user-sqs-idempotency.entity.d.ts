import { BaseSqsIdempotencyEntity } from './base-sqs-idempotency.entity';
export type PartnerCreateUserIdempotencyResult = Readonly<{
    user_external_id: string;
    person_external_id: string;
}>;
export declare class PartnerCreateUserSqsIdempotencyEntity extends BaseSqsIdempotencyEntity {
    result: PartnerCreateUserIdempotencyResult | null;
}
