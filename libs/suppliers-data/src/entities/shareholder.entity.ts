import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';

@Entity({ name: 'shareholders', schema: 'suppliers_schema' })
export class ShareholderEntity extends BaseExternalIdEntity {
  @ManyToOne(() => BusinessEntity, { nullable: false })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity;

  @RelationId((s: ShareholderEntity) => s.business)
  businessId: number;

  @ManyToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @RelationId((s: ShareholderEntity) => s.person)
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

  @Column({
    name: 'credit_check_required',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  creditCheckRequired: boolean;

  @Column({
    name: 'credit_check_completed',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  creditCheckCompleted: boolean;

  @Column({
    name: 'is_legal_representative',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isLegalRepresentative: boolean;
}
