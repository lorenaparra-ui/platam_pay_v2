import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CategoryEntity } from "./product.entity";
/**
 * Entidad TypeORM para credit_facilities.
 * Relaciones: status, categories (1:N). El vínculo opcional con partner pasa por categories.partner_id.
 */
export declare class CreditFacilityEntity extends BaseExternalIdEntity {
    contractId: string | null;
    statusId: number;
    totalLimit: string;
    categories: CategoryEntity[];
}
