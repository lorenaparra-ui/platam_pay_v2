import type { CreditFacility } from "../../domain/models/credit-facility.model";
import type { Category } from "../../../categories/domain/models/category.model";

/** Resultado de la orquestación línea + N categorías (vía módulo categories). */
export interface CreateCreditFacilityWithCategoriesResult {
  facility: CreditFacility;
  categories: Category[];
}
