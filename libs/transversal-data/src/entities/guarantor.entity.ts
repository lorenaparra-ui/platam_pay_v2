import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'guarantors', schema: 'transversal_schema' })
export class GuarantorEntity extends BaseExternalIdEntity {
  @Column({ name: 'credit_application_id', type: 'bigint' })
  creditApplicationId: number;

  @Column({ name: 'person_id', type: 'bigint' })
  personId: number;

  @Column({ name: 'contract_signer_id', type: 'bigint', nullable: true })
  contractSignerId: number | null;

  @Column({
    name: 'guarantor_type',
    type: 'varchar',
    length: 20,
  })
  guarantorType: string;

  @Column({
    name: 'relationship_to_applicant',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  relationshipToApplicant: string | null;

  @Column({ name: 'is_primary_guarantor', type: 'boolean', default: false })
  isPrimaryGuarantor: boolean;

  @Column({ name: 'selected_after_credit_check', type: 'boolean', default: false })
  selectedAfterCreditCheck: boolean;

  @Column({ name: 'signature_url', type: 'text', nullable: true })
  signatureUrl: string | null;

  @Column({ name: 'signature_date', type: 'timestamptz', nullable: true })
  signatureDate: Date | null;
}
