import type { CreditFacilitiesStatuses } from '@platam/shared';

export class Category {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly credit_facility_id: number,
    readonly partner_id: number | null,
    readonly name: string,
    readonly discount_percentage: string,
    readonly interest_rate: string,
    readonly disbursement_fee_percent: string | null,
    readonly minimum_disbursement_fee: string | null,
    readonly delay_days: number,
    readonly term_days: number,
    readonly state: CreditFacilitiesStatuses,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateCategoryProps {
  credit_facility_id: number;
  partner_id: number | null;
  name: string;
  discount_percentage: string;
  interest_rate: string;
  disbursement_fee_percent: string | null;
  minimum_disbursement_fee: string | null;
  delay_days: number;
  term_days: number;
  state: CreditFacilitiesStatuses;
}

export type UpdateCategoryProps = Partial<CreateCategoryProps>;
