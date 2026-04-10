import type { ProductsReferenceLookupPort } from '@common/ports/products-reference-lookup.port';
import { Category } from '@modules/categories/domain/models/category.models';

export interface CategoryPublicFields {
  external_id: string;
  credit_facility_external_id: string;
  partner_external_id: string | null;
  name: string;
  modality: string;
  discount_percentage: string;
  interest_rate: string;
  disbursement_fee_percent: string | null;
  minimum_disbursement_fee: string | null;
  delay_days: number;
  term_days: number;
  installment_frequency: string;
  installment_count: number;
  initial_payment_pct: string;
  state: string;
  created_at: Date;
  updated_at: Date;
}

export async function build_category_public_fields(
  row: Category,
  lookup: ProductsReferenceLookupPort,
): Promise<CategoryPublicFields> {
  const credit_facility_external_id =
    await lookup.get_credit_facility_external_id_by_internal_id(
      row.credit_facility_id,
    );
  const partner_external_id =
    row.partner_id === null
      ? null
      : await lookup.get_partner_external_id_by_internal_id(row.partner_id);

  if (
    credit_facility_external_id === null ||
    (row.partner_id !== null && partner_external_id === null)
  ) {
    throw new Error('category reference resolution failed');
  }

  return {
    external_id: row.external_id,
    credit_facility_external_id,
    partner_external_id,
    name: row.name,
    modality: row.modality,
    discount_percentage: row.discount_percentage,
    interest_rate: row.interest_rate,
    disbursement_fee_percent: row.disbursement_fee_percent,
    minimum_disbursement_fee: row.minimum_disbursement_fee,
    delay_days: row.delay_days,
    term_days: row.term_days,
    installment_frequency: row.installment_frequency,
    installment_count: row.installment_count,
    initial_payment_pct: row.initial_payment_pct,
    state: String(row.state),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
