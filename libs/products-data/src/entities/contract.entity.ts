import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

/**
 * Contratos de firma (products_schema.contracts).
 * FKs implícitas: user_id → transversal_schema.users, application_id → products_schema.credit_applications,
 * status_id → transversal_schema.statuses (entity_type = contracts).
 */
@Entity({ name: 'contracts', schema: 'products_schema' })
export class ContractEntity extends BaseExternalIdEntity {
  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'application_id', type: 'bigint', nullable: true })
  applicationId: number | null;

  @Column({ name: 'zapsign_token', type: 'varchar', nullable: true, unique: true })
  zapsignToken: string | null;

  @Column({ name: 'status_id', type: 'bigint' })
  statusId: number;

  @Column({ name: 'original_file_url', type: 'text', nullable: true })
  originalFileUrl: string | null;

  @Column({ name: 'signed_file_url', type: 'text', nullable: true })
  signedFileUrl: string | null;

  @Column({ name: 'form_answers_json', type: 'jsonb', nullable: true })
  formAnswersJson: Record<string, unknown> | null;
}
