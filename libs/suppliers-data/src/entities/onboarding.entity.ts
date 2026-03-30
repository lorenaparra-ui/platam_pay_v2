import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity({ name: 'credit_applications_bnpl', schema: 'suppliers_schema' })
export class OnboardingEntity extends BaseExternalIdEntity {
  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'user_product_id', type: 'bigint', nullable: true })
  userProductId: number | null;

  @Column({ name: 'partner_id', type: 'bigint', nullable: true })
  partnerId: number | null;

  @Column({ name: 'partner_category_id', type: 'bigint', nullable: true })
  partnerCategoryId: number | null;

  @Column({ name: 'sales_rep_id', type: 'bigint', nullable: true })
  salesRepId: number | null;

  @Column({
    name: 'business_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  businessName: string | null;

  @Column({
    name: 'business_relation_id',
    type: 'bigint',
    nullable: true,
    default: () =>
      "get_status_id('credit_applications_bnpl', 'business_relation')",
  })
  businessRelationId: number | null;

  @Column({
    name: 'business_type_name',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  businessTypeName: string | null;

  @Column({ name: 'business_type_code', type: 'bigint', nullable: true })
  businessTypeCode: number | null;

  @Column({ name: 'business_address', type: 'text', nullable: true })
  businessAddress: string | null;

  @Column({
    name: 'business_city',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  businessCity: string | null;

  @Column({ name: 'business_rent_amount', type: 'bigint', nullable: true })
  businessRentAmount: string | null;

  @Column({ name: 'number_of_locations', type: 'int', nullable: true })
  numberOfLocations: number | null;

  @Column({ name: 'number_of_employees', type: 'int', nullable: true })
  numberOfEmployees: number | null;

  @Column({ name: 'business_seniority_id', type: 'bigint', nullable: true })
  businessSeniorityId: number | null;

  @Column({ name: 'sector_experience', type: 'varchar', nullable: true })
  sectorExperience: string | null;

  @Column({ name: 'relationship_to_business', type: 'varchar', nullable: true })
  relationshipToBusiness: string | null;

  @Column({ name: 'monthly_income', type: 'bigint', nullable: true })
  monthlyIncome: string | null;

  @Column({ name: 'monthly_expenses', type: 'bigint', nullable: true })
  monthlyExpenses: string | null;

  @Column({ name: 'monthly_purchases', type: 'bigint', nullable: true })
  monthlyPurchases: string | null;

  @Column({ name: 'current_purchases', type: 'bigint', nullable: true })
  currentPurchases: string | null;

  @Column({ name: 'total_assets', type: 'bigint', nullable: true })
  totalAssets: string | null;

  @Column({ name: 'requested_credit_line', type: 'bigint', nullable: true })
  requestedCreditLine: string | null;

  @Column({ name: 'is_current_client', type: 'boolean', default: false })
  isCurrentClient: boolean;

  @Column({
    name: 'status_id',
    type: 'bigint',
    default: () => "get_status_id('credit_applications_bnpl', 'authorized')",
  })
  statusId: number;

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
  approvedCreditLine: string | null;

  @Column({ name: 'analyst_report', type: 'text', nullable: true })
  analystReport: string | null;

  @Column({ name: 'risk_profile', type: 'varchar', nullable: true })
  riskProfile: string | null;

  @Column({ name: 'privacy_policy_accepted', type: 'boolean', default: false })
  privacyPolicyAccepted: boolean;

  @Column({ name: 'privacy_policy_date', type: 'timestamptz', nullable: true })
  privacyPolicyDate: Date | null;
}
