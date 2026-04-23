import { Entity } from 'typeorm';
import { BaseSqsIdempotencyEntity } from './base-sqs-idempotency.entity';

export type PartnerCreateUserIdempotencyResult = Readonly<{
  user_external_id: string;
  person_external_id: string;
}>;

@Entity({ schema: 'transversal_schema', name: 'partner_create_user_sqs_idempotency' })
export class PartnerCreateUserSqsIdempotencyEntity extends BaseSqsIdempotencyEntity {
  override result: PartnerCreateUserIdempotencyResult | null = null;
}
