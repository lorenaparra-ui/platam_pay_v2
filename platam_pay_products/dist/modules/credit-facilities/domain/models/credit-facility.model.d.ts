import type { Category } from "./category.model";
export interface CreditFacility {
    id: number;
    external_id: string;
    contract_id: string | null;
    status_id: number;
    total_limit: string;
    created_at: Date;
    updated_at: Date;
    categories: Category[];
}
