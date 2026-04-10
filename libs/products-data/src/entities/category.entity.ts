import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { CategoryState, InstallmentFrequencyTypes, ModalityTypes } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { PartnersEntity } from '@app/suppliers-data';
import { CreditFacilityEntity } from './credit-facility.entity';

/**
 * Entidad TypeORM para categories.
 * Vínculo a facilidad vía `client_category_assignments`; partner_id opcional.
 */
@Entity({ name: 'categories', schema: 'products_schema' })
export class CategoryEntity extends BaseExternalIdEntity {
 

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({
    name: 'modality',
    type: 'enum',
    enum: ModalityTypes,
    enumName: 'loan_request_modality',
  })
  modality: ModalityTypes;

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

  
  @Column({
    name: 'installment_frequency',
    type: 'enum',
    enum: InstallmentFrequencyTypes,
    enumName: 'category_installment_frequency',
  })
  installmentFrequency: InstallmentFrequencyTypes;
  
  @Column({ name: 'installment_count', type: 'int' })
  installmentCount: number;
  
  @Column({ name: 'initial_payment_pct', type: 'decimal', precision: 8, scale: 4 })
  initialPaymentPct: string;
  
  @Column({
    name: 'state',
    type: 'enum',
    enum: CategoryState,
    enumName: 'credit_facility_state',
    default: CategoryState.ACTIVE,
  })
  state: CategoryState;


  @ManyToOne(() => PartnersEntity, (p: PartnersEntity) => p.categories, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'partner_id' })
  partner: PartnersEntity | null;

  @RelationId((c: CategoryEntity) => c.partner)
  partnerId: number | null;

  @ManyToMany(() => CreditFacilityEntity, (creditFacility) => creditFacility.categories)
  creditFacility: CreditFacilityEntity[];
}
