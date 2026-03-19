export interface Category {
  id: number;
  external_id: string;
  credit_facility_id: number;
  partner_id: number | null;
  name: string;
  discount_percentage: string;
  interest_rate: string;
  disbursement_fee_percent: string | null;
  minimum_disbursement_fee: string | null;
  delay_days: number;
  term_days: number;
  status_id: number;
  created_at: Date;
  updated_at: Date;
}
