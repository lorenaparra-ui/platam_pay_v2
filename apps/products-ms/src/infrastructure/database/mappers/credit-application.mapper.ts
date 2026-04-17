import { CreditApplicationEntity } from '@app/products-data';
import { CreditApplication } from '@modules/credit-applications/domain/models/credit-application.models';
import { CreditApplicationStatus } from '@platam/shared';

function to_nullable_number(val: unknown): number | null {
  if (val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}

function to_nullable_string(val: unknown): string | null {
  if (val === null || val === undefined) return null;
  return String(val);
}

function to_nullable_date(val: unknown): Date | null {
  if (val === null || val === undefined) return null;
  return new Date(String(val));
}

function to_nullable_bool(val: unknown): boolean | null {
  if (val === null || val === undefined) return null;
  if (typeof val === 'boolean') return val;
  return val === 'true' || val === true;
}

function to_status(val: unknown): CreditApplicationStatus {
  const s = String(val ?? CreditApplicationStatus.IN_PROGRESS);
  return Object.values(CreditApplicationStatus).includes(s as CreditApplicationStatus)
    ? (s as CreditApplicationStatus)
    : CreditApplicationStatus.IN_PROGRESS;
}

export class CreditApplicationMapper {
  static to_domain(row: CreditApplicationEntity): CreditApplication {
    return new CreditApplication(
      row.id,
      row.externalId,
      row.person?.id ?? null,
      row.partner?.id ?? null,
      row.partnerCategory?.id ?? null,
      row.business?.id ?? null,
      row.salesRepresentative?.id ?? null,
      row.numberOfLocations,
      row.numberOfEmployees,
      row.businessSeniority,
      row.sectorExperience,
      row.businessFlagshipM2,
      row.businessHasRent,
      row.businessRentAmount,
      row.monthlyIncome,
      row.monthlyExpenses,
      row.monthlyPurchases,
      row.currentPurchases,
      row.totalAssets,
      row.requestedCreditLine,
      row.isCurrentClient,
      row.status,
      row.submissionDate,
      row.approvalDate,
      row.rejectionReason,
      row.creditStudyDate,
      row.creditScore,
      row.creditDecision,
      row.approvedCreditLine,
      row.analystReport,
      row.riskProfile,
      row.privacyPolicyAccepted,
      row.privacyPolicyDate,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): CreditApplication {
    return new CreditApplication(
      Number(row['id']),
      String(row['external_id']),
      to_nullable_number(row['person_id']),
      to_nullable_number(row['partner_id']),
      to_nullable_number(row['partner_category_id']),
      to_nullable_number(row['business_id']),
      to_nullable_number(row['sales_representative_id']),
      to_nullable_number(row['number_of_locations']),
      to_nullable_number(row['number_of_employees']),
      to_nullable_string(row['business_seniority']),
      to_nullable_string(row['sector_experience']),
      to_nullable_number(row['business_flagship_m2']),
      to_nullable_bool(row['business_has_rent']),
      to_nullable_number(row['business_rent_amount']),
      to_nullable_number(row['monthly_income']),
      to_nullable_number(row['monthly_expenses']),
      to_nullable_number(row['monthly_purchases']),
      to_nullable_number(row['current_purchases']),
      to_nullable_number(row['total_assets']),
      to_nullable_number(row['requested_credit_line']),
      row['is_current_client'] === true || row['is_current_client'] === 'true',
      to_status(row['status']),
      to_nullable_date(row['submission_date']),
      to_nullable_date(row['approval_date']),
      to_nullable_string(row['rejection_reason']),
      to_nullable_date(row['credit_study_date']),
      to_nullable_string(row['credit_score']),
      to_nullable_string(row['credit_decision']),
      to_nullable_number(row['approved_credit_line']),
      to_nullable_string(row['analyst_report']),
      to_nullable_string(row['risk_profile']),
      row['privacy_policy_accepted'] === true || row['privacy_policy_accepted'] === 'true',
      to_nullable_date(row['privacy_policy_date']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
