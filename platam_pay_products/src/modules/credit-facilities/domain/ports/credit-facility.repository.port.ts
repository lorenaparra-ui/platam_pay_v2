import type { CreditFacility } from "../models/credit-facility.model";

export const CREDIT_FACILITY_REPOSITORY = Symbol("CREDIT_FACILITY_REPOSITORY");

/** Payload de una categoría al crear junto con la línea de crédito. */
export interface CreateCategoryInput {
  name: string;
  delay_days: number;
  disbursement_fee_percent: string | null;
  discount_percentage: string;
  interest_rate: string;
  minimum_disbursement_fee: string | null;
  term_days: number;
  partner_id?: number | null;
  status_id: number;
}

export interface CreateCreditFacilityWithCategoriesInput {
  contract_id: string | null;
  status_id: number;
  total_limit: string;
  categories: CreateCategoryInput[];
}

export interface CreditFacilityRepositoryPort {
  create_with_categories(
    input: CreateCreditFacilityWithCategoriesInput,
  ): Promise<CreditFacility>;
}
