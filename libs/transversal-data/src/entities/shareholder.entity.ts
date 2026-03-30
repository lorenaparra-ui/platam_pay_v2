import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'shareholders', schema: 'transversal_schema' })
export class ShareholderEntity extends BaseExternalIdEntity {
  @Column({ name: 'company_id', type: 'bigint' })
  companyId: number;

  @Column({ name: 'person_id', type: 'bigint' })
  personId: number;

  @Column({
    name: 'ownership_percentage',
    type: 'decimal',
    precision: 5,
    scale: 4,
    nullable: true,
  })
  ownershipPercentage: string | null;

  @Column({ name: 'evaluation_order', type: 'int', nullable: true })
  evaluationOrder: number | null;

  @Column({ name: 'credit_check_required', type: 'boolean', default: false })
  creditCheckRequired: boolean;

  @Column({ name: 'credit_check_completed', type: 'boolean', default: false })
  creditCheckCompleted: boolean;

  @Column({ name: 'is_legal_representative', type: 'boolean', default: false })
  isLegalRepresentative: boolean;
}
