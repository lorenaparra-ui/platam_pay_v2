import type {
  Category,
  CreateCategoryProps,
  UpdateCategoryProps,
} from '../models/category.models';

export interface CategoryRepository {
  find_by_external_id(external_id: string): Promise<Category | null>;

  find_all(filter?: { credit_facility_id?: number; partner_id?: number }): Promise<Category[]>;

  create(props: CreateCategoryProps): Promise<Category>;

  update_by_external_id(
    external_id: string,
    patch: UpdateCategoryProps,
  ): Promise<Category | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
