import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { SalesRepresentativeEntity } from '../../../suppliers-data/src/entities/sales-representative.entity';
import { CreditApplicationStatus } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { ContractEntity } from './contract.entity';
import { PersonEntity } from '@app/transversal-data';
import { BusinessEntity, PartnerEntity } from '@app/suppliers-data';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'credit_applications', schema: 'products_schema' })
@Index('IDX_credit_applications_partner_created_at', ['partner', 'createdAt'])
@Index('IDX_credit_applications_person_created_at', ['person', 'createdAt'])
export class CreditApplicationEntity extends BaseExternalIdEntity {
  @ManyToOne(
    () => PersonEntity,
    { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }
  )
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity | null;

  @ManyToOne(() => PartnerEntity, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  partner: PartnerEntity | null;

  @ManyToOne(() => CategoryEntity, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'partner_category_id', referencedColumnName: 'id' })
  partnerCategory: CategoryEntity | null;

  @ManyToOne(() => BusinessEntity, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity | null;

  @Column({ name: 'number_of_locations', type: 'int', nullable: true })
  numberOfLocations: number | null;

  @Column({ name: 'number_of_employees', type: 'int', nullable: true })
  numberOfEmployees: number | null;

  @Column({ name: 'business_seniority', type: 'varchar', nullable: true })
  businessSeniority: string | null;

  @Column({ name: 'sector_experience', type: 'varchar', nullable: true })
  sectorExperience: string | null;

  @Column({ name: 'business_flagship_m2', type: 'int', nullable: true })
  businessFlagshipM2: number | null;

  @Column({ name: 'business_has_rent', type: 'boolean', nullable: true })
  businessHasRent: boolean | null;

  @Column({ name: 'business_rent_amount', type: 'bigint', nullable: true })
  businessRentAmount: number | null;

  @Column({ name: 'monthly_income', type: 'bigint', nullable: true })
  monthlyIncome: number | null;

  @Column({ name: 'monthly_expenses', type: 'bigint', nullable: true })
  monthlyExpenses: number | null;

  @Column({ name: 'monthly_purchases', type: 'bigint', nullable: true })
  monthlyPurchases: number | null;

  @Column({ name: 'current_purchases', type: 'bigint', nullable: true })
  currentPurchases: number | null;

  @Column({ name: 'total_assets', type: 'bigint', nullable: true })
  totalAssets: number | null;

  @Column({ name: 'requested_credit_line', type: 'bigint', nullable: true })
  requestedCreditLine: number | null;

  @Column({
    name: 'is_current_client',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isCurrentClient: boolean;

  @Column({
    name: 'status',
    type: 'enum',
    enum: CreditApplicationStatus,
    enumName: 'credit_application_status',
    default: CreditApplicationStatus.IN_PROGRESS,
  })
  status: CreditApplicationStatus;

  @Column({ name: 'submission_date', type: 'timestamptz', nullable: true })
  submissionDate: Date | null;

  @Column({ name: 'approval_date', type: 'timestamptz', nullable: true })
  approvalDate: Date | null;

  @Column({
    name: 'rejection_reason',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  rejectionReason: string | null;

  @Column({ name: 'credit_study_date', type: 'timestamptz', nullable: true })
  creditStudyDate: Date | null;

  @Column({
    name: 'credit_score',
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  creditScore: string | null;

  @Column({ name: 'credit_decision', type: 'varchar', nullable: true })
  creditDecision: string | null;

  @Column({ name: 'approved_credit_line', type: 'bigint', nullable: true })
  approvedCreditLine: number | null;

  @Column({ name: 'analyst_report', type: 'text', nullable: true })
  analystReport: string | null;

  @Column({ name: 'risk_profile', type: 'varchar', nullable: true })
  riskProfile: string | null;

  @Column({
    name: 'privacy_policy_accepted',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  privacyPolicyAccepted: boolean;

  @Column({ name: 'privacy_policy_date', type: 'timestamptz', nullable: true })
  privacyPolicyDate: Date | null;

  @ManyToOne(() => SalesRepresentativeEntity, { nullable: false })
  @JoinColumn({
    name: 'sales_representative_id',
    referencedColumnName: 'id',
  })
  salesRepresentative: SalesRepresentativeEntity 

}
