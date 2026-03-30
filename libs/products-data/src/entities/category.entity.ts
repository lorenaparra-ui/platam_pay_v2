import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CreditFacilityEntity } from './credit-facility.entity';
import { PartnersEntity } from '../../../suppliers-data/src/entities/partners.entity';

/**
 * Entidad TypeORM para categories.
 * N:1 credit_facility; partner_id opcional (categoría propia del partner).
 */
@Entity({ name: 'categories', schema: 'products_schema' })
export class CategoryEntity extends BaseExternalIdEntity {
  @Column({ name: 'credit_facility_id', type: 'bigint' })
  creditFacilityId: number;

  @Column({ name: 'partner_id', type: 'bigint', nullable: true })
  partnerId: number | null;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({
    name: 'discount_percentage',
    type: 'decimal',
    precision: 8,
    scale: 4,
  })
  discountPercentage: string;

  @Column({
    name: 'interest_rate',
    type: 'decimal',
    precision: 8,
    scale: 4,
  })
  interestRate: string;

  @Column({
    name: 'disbursement_fee_percent',
    type: 'decimal',
    precision: 8,
    scale: 4,
    nullable: true,
  })
  disbursementFeePercent: string | null;

  @Column({
    name: 'minimum_disbursement_fee',
    type: 'decimal',
    precision: 18,
    scale: 4,
    nullable: true,
  })
  minimumDisbursementFee: string | null;

  @Column({ name: 'delay_days', type: 'int' })
  delayDays: number;

  @Column({ name: 'term_days', type: 'int' })
  termDays: number;

  @Column({ name: 'status_id', type: 'bigint' })
  statusId: number;

  @ManyToOne(() => CreditFacilityEntity, (cf) => cf.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'credit_facility_id' })
  creditFacility: CreditFacilityEntity;

  @ManyToOne(() => PartnersEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnersEntity | null;
}
