import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';

@Entity({ name: 'shareholders', schema: 'suppliers_schema' })
export class ShareholderEntity extends BaseExternalIdEntity {
  @ManyToOne(() => BusinessEntity, { nullable: false })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  businessId: BusinessEntity;


  @ManyToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @RelationId((s: ShareholderEntity) => s.person)
  personId: number;

  @ManyToOne(() => BusinessEntity, { nullable: true })
  @JoinColumn({ name: 'shareholder_business_id', referencedColumnName: 'id' })
  shareholder_business: BusinessEntity | null;

  @RelationId((s: ShareholderEntity) => s.shareholder_business)
  shareholder_business_id: number | null;

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
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
