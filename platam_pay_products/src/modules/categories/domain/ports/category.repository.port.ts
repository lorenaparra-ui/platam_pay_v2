import type { Category } from "../models/category.model";

export const CATEGORY_REPOSITORY = Symbol("CATEGORY_REPOSITORY");

export interface CategoryCreateInput {
  credit_facility_id: number;
  partner_id?: number | null;
  name: string;
  delay_days: number;
  disbursement_fee_percent: string | null;
  discount_percentage: string;
  interest_rate: string;
  minimum_disbursement_fee: string | null;
  term_days: number;
  status_id: number;
}

/** Payload de categoría sin credit_facility_id (uso en creación masiva). */
export type CategoryLineInput = Omit<CategoryCreateInput, "credit_facility_id">;

export interface CategoryUpdateInput {
  partner_id?: number | null;
  name?: string;
  delay_days?: number;
  disbursement_fee_percent?: string | null;
  discount_percentage?: string;
  interest_rate?: string;
  minimum_disbursement_fee?: string | null;
  term_days?: number;
  status_id?: number;
}

export interface CategoryRepositoryPort {
  create(input: CategoryCreateInput): Promise<Category>;
  create_bulk(
    credit_facility_id: number,
    items: CategoryLineInput[],
  ): Promise<Category[]>;
  find_by_external_id(external_id: string): Promise<Category | null>;
  find_by_credit_facility_id(credit_facility_id: number): Promise<Category[]>;
  update_by_external_id(
    external_id: string,
    input: CategoryUpdateInput,
  ): Promise<Category | null>;
  delete_by_external_id(external_id: string): Promise<boolean>;
}
