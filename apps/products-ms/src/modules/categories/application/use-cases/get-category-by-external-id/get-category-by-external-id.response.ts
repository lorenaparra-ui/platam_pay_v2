import { CategoryPublicFields } from '@modules/categories/application/mapping/category-public-fields.builder';

export class GetCategoryByExternalIdResponse implements CategoryPublicFields {
  external_id: string;
  credit_facility_external_id: string;
  partner_external_id: string | null;
  name: string;
  discount_percentage: string;
  interest_rate: string;
  disbursement_fee_percent: string | null;
  minimum_disbursement_fee: string | null;
  delay_days: number;
  term_days: number;
  status_external_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(fields: CategoryPublicFields) {
    Object.assign(this, fields);
  }
}
