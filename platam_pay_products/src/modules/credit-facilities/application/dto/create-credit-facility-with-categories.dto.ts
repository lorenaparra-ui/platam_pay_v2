import type { CategoryLineInput } from "../../../categories/domain/ports/category.repository.port";

/**
 * Entrada de aplicación para orquestar línea + categorías.
 * Solo tipos; validación en capa HTTP si se expone endpoint.
 */
export interface CreateCreditFacilityWithCategoriesInput {
  contract_id: string | null;
  status_id: number;
  total_limit: string;
  categories: CategoryLineInput[];
}
