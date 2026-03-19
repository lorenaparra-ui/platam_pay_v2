import type { CategoryLineInput } from "../../../categories/domain/ports/category.repository.port";
export interface CreateCreditFacilityWithCategoriesInput {
    contract_id: string | null;
    status_id: number;
    total_limit: string;
    categories: CategoryLineInput[];
}
