import { Column, Entity } from "typeorm";
import { BaseExternalIdEntity } from "./base-external-id.entity";

/**
 * Entidad TypeORM para credit_applications_bnpl.
 * FKs: user_id -> users.id, user_product_id -> user_products.id, partner_id -> partners.id,
 * partner_category_id -> partner_categories.id, sales_rep_id -> sales_representatives.id,
 * business_id -> businesses.id, status_id -> statuses.id.
 * Sin relaciones TypeORM declaradas; se usan solo IDs en dominio.
 */
@Entity("credit_applications_bnpl")
export class CreditApplicationBnplEntity extends BaseExternalIdEntity {
  @Column({ name: "user_id", type: "bigint" })
  userId: number;

  @Column({ name: "user_product_id", type: "bigint", nullable: true })
  userProductId: number | null;

  @Column({ name: "partner_id", type: "bigint", nullable: true })
  partnerId: number | null;

  @Column({ name: "partner_category_id", type: "bigint", nullable: true })
  partnerCategoryId: number | null;

  @Column({ name: "sales_rep_id", type: "bigint", nullable: true })
  salesRepId: number | null;

  @Column({ name: "business_id", type: "bigint", nullable: true })
  businessId: number | null;

  @Column({ name: "number_of_locations", type: "int", nullable: true })
  numberOfLocations: number | null;

  @Column({ name: "number_of_employees", type: "int", nullable: true })
  numberOfEmployees: number | null;

  @Column({ name: "business_seniority", type: "varchar", nullable: true })
  businessSeniority: string | null;

  @Column({ name: "sector_experience", type: "varchar", nullable: true })
  sectorExperience: string | null;

  @Column({ name: "business_flagship_m2", type: "int", nullable: true })
  businessFlagshipM2: number | null;

  @Column({ name: "business_has_rent", type: "boolean", nullable: true })
  businessHasRent: boolean | null;

  @Column({ name: "business_rent_amount", type: "bigint", nullable: true })
  businessRentAmount: number | null;

  @Column({ name: "monthly_income", type: "bigint", nullable: true })
  monthlyIncome: number | null;

  @Column({ name: "monthly_expenses", type: "bigint", nullable: true })
  monthlyExpenses: number | null;

  @Column({ name: "monthly_purchases", type: "bigint", nullable: true })
  monthlyPurchases: number | null;

  @Column({ name: "current_purchases", type: "bigint", nullable: true })
  currentPurchases: number | null;

  @Column({ name: "total_assets", type: "bigint", nullable: true })
  totalAssets: number | null;

  @Column({ name: "requested_credit_line", type: "bigint", nullable: true })
  requestedCreditLine: number | null;

  @Column({ name: "is_current_client", type: "boolean", default: false })
  isCurrentClient: boolean;

  @Column({ name: "status_id", type: "bigint" })
  statusId: number;

  @Column({ name: "submission_date", type: "timestamptz", nullable: true })
  submissionDate: Date | null;

  @Column({ name: "approval_date", type: "timestamptz", nullable: true })
  approvalDate: Date | null;

  @Column({
    name: "rejection_reason",
    type: "varchar",
    length: 500,
    nullable: true,
  })
  rejectionReason: string | null;

  @Column({ name: "credit_study_date", type: "timestamptz", nullable: true })
  creditStudyDate: Date | null;

  @Column({
    name: "credit_score",
    type: "decimal",
    precision: 8,
    scale: 2,
    nullable: true,
  })
  creditScore: string | null;

  @Column({ name: "credit_decision", type: "varchar", nullable: true })
  creditDecision: string | null;

  @Column({ name: "approved_credit_line", type: "bigint", nullable: true })
  approvedCreditLine: number | null;

  @Column({ name: "analyst_report", type: "text", nullable: true })
  analystReport: string | null;

  @Column({ name: "risk_profile", type: "varchar", nullable: true })
  riskProfile: string | null;

  @Column({ name: "privacy_policy_accepted", type: "boolean", default: false })
  privacyPolicyAccepted: boolean;

  @Column({ name: "privacy_policy_date", type: "timestamptz", nullable: true })
  privacyPolicyDate: Date | null;
}
