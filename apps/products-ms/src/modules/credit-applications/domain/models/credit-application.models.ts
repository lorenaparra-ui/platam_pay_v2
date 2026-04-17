import type { CreditApplicationStatus } from '@platam/shared';

export class CreditApplication {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly person_id: number | null,
    readonly partner_id: number | null,
    readonly partner_category_id: number | null,
    readonly business_id: number | null,
    readonly sales_representative_id: number | null, // nullable: self-service applications have no sales rep
    readonly number_of_locations: number | null,
    readonly number_of_employees: number | null,
    readonly business_seniority: string | null,
    readonly sector_experience: string | null,
    readonly business_flagship_m2: number | null,
    readonly business_has_rent: boolean | null,
    readonly business_rent_amount: number | null,
    readonly monthly_income: number | null,
    readonly monthly_expenses: number | null,
    readonly monthly_purchases: number | null,
    readonly current_purchases: number | null,
    readonly total_assets: number | null,
    readonly requested_credit_line: number | null,
    readonly is_current_client: boolean,
    readonly status: CreditApplicationStatus,
    readonly submission_date: Date | null,
    readonly approval_date: Date | null,
    readonly rejection_reason: string | null,
    readonly credit_study_date: Date | null,
    readonly credit_score: string | null,
    readonly credit_decision: string | null,
    readonly approved_credit_line: number | null,
    readonly analyst_report: string | null,
    readonly risk_profile: string | null,
    readonly privacy_policy_accepted: boolean,
    readonly privacy_policy_date: Date | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateCreditApplicationProps {
  external_id?: string;
  person_id: number | null;
  partner_id: number | null;
  partner_category_id: number | null;
  business_id: number | null;
  sales_representative_id: number | null;
  status: CreditApplicationStatus;
  is_current_client: boolean;
  privacy_policy_accepted: boolean;
  number_of_locations?: number | null;
  number_of_employees?: number | null;
  business_seniority?: string | null;
  sector_experience?: string | null;
  business_flagship_m2?: number | null;
  business_has_rent?: boolean | null;
  business_rent_amount?: number | null;
  monthly_income?: number | null;
  monthly_expenses?: number | null;
  monthly_purchases?: number | null;
  current_purchases?: number | null;
  total_assets?: number | null;
  requested_credit_line?: number | null;
  submission_date?: Date | null;
  privacy_policy_date?: Date | null;
  approval_date?: Date | null;
  rejection_reason?: string | null;
  credit_study_date?: Date | null;
  credit_score?: string | null;
  credit_decision?: string | null;
  approved_credit_line?: number | null;
  analyst_report?: string | null;
  risk_profile?: string | null;
}

export type UpdateCreditApplicationProps = Partial<CreateCreditApplicationProps>;
