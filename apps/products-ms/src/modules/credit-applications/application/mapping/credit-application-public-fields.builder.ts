import type { CreditApplicationStatus } from '@platam/shared';
import type { CreditApplication } from '@modules/credit-applications/domain/models/credit-application.models';

export interface CreditApplicationPublicFields {
  externalId: string;
  personId: number | null;
  partnerId: number | null;
  partnerCategoryId: number | null;
  businessId: number | null;
  salesRepresentativeId: number | null;
  numberOfLocations: number | null;
  numberOfEmployees: number | null;
  businessSeniority: string | null;
  sectorExperience: string | null;
  businessFlagshipM2: number | null;
  businessHasRent: boolean | null;
  businessRentAmount: number | null;
  monthlyIncome: number | null;
  monthlyExpenses: number | null;
  monthlyPurchases: number | null;
  currentPurchases: number | null;
  totalAssets: number | null;
  requestedCreditLine: number | null;
  isCurrentClient: boolean;
  status: CreditApplicationStatus;
  submissionDate: Date | null;
  approvalDate: Date | null;
  rejectionReason: string | null;
  creditStudyDate: Date | null;
  creditScore: string | null;
  creditDecision: string | null;
  approvedCreditLine: number | null;
  analystReport: string | null;
  riskProfile: string | null;
  privacyPolicyAccepted: boolean;
  privacyPolicyDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function build_credit_application_public_fields(
  row: CreditApplication,
): CreditApplicationPublicFields {
  return {
    externalId: row.external_id,
    personId: row.person_id,
    partnerId: row.partner_id,
    partnerCategoryId: row.partner_category_id,
    businessId: row.business_id,
    salesRepresentativeId: row.sales_representative_id,
    numberOfLocations: row.number_of_locations,
    numberOfEmployees: row.number_of_employees,
    businessSeniority: row.business_seniority,
    sectorExperience: row.sector_experience,
    businessFlagshipM2: row.business_flagship_m2,
    businessHasRent: row.business_has_rent,
    businessRentAmount: row.business_rent_amount,
    monthlyIncome: row.monthly_income,
    monthlyExpenses: row.monthly_expenses,
    monthlyPurchases: row.monthly_purchases,
    currentPurchases: row.current_purchases,
    totalAssets: row.total_assets,
    requestedCreditLine: row.requested_credit_line,
    isCurrentClient: row.is_current_client,
    status: row.status,
    submissionDate: row.submission_date,
    approvalDate: row.approval_date,
    rejectionReason: row.rejection_reason,
    creditStudyDate: row.credit_study_date,
    creditScore: row.credit_score,
    creditDecision: row.credit_decision,
    approvedCreditLine: row.approved_credit_line,
    analystReport: row.analyst_report,
    riskProfile: row.risk_profile,
    privacyPolicyAccepted: row.privacy_policy_accepted,
    privacyPolicyDate: row.privacy_policy_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
