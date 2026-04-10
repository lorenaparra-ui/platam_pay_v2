import { CategoryPublicFields } from '@modules/categories/application/mapping/category-public-fields.builder';

export class UpdateCategoryByExternalIdResponse implements CategoryPublicFields {
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

  constructor(fields: CategoryPublicFields) {
    Object.assign(this, fields);
  }
}
