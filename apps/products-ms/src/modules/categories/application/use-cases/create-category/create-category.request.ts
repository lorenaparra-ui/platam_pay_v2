import type { CategoryState } from '@platam/shared';

export class CreateCategoryRequest {
  constructor(
    readonly credit_facility_external_id: string,
    /** FK interna `suppliers_schema.partners.id`; null si la categoría no va ligada a partner. */
    readonly partner_id: number | null,
    readonly name: string,
    readonly discount_percentage: string,
    readonly interest_rate: string,
    readonly disbursement_fee_percent: string | null,
    readonly minimum_disbursement_fee: string | null,
    readonly delay_days: number,
    readonly term_days: number,
    readonly state: CategoryState,
  ) {}
}
