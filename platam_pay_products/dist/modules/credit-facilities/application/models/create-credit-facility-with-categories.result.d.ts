import type { CreditFacility } from "../../domain/models/credit-facility.model";
import type { Category } from "../../../categories/domain/models/category.model";
export interface CreateCreditFacilityWithCategoriesResult {
    facility: CreditFacility;
    categories: Category[];
}
