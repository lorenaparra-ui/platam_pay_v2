import type { Statuses } from '@platam/shared';

export class UpdateCategoryByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly credit_facility_external_id: string | undefined,
    /** FK interna `suppliers_schema.partners.id`; undefined = no cambiar; null = desasociar. */
    readonly partner_id: number | null | undefined,
    readonly name: string | undefined,
    readonly discount_percentage: string | undefined,
    readonly interest_rate: string | undefined,
    readonly disbursement_fee_percent: string | null | undefined,
    readonly minimum_disbursement_fee: string | null | undefined,
    readonly delay_days: number | undefined,
    readonly term_days: number | undefined,
    readonly state: Statuses | undefined,
  ) {}
}
