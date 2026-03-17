import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CategoryEntity } from "./category.entity";
export declare class CreditFacilityEntity extends BaseExternalIdEntity {
    partnerId: number | null;
    contractId: string | null;
    statusId: number;
    totalLimit: string;
    categories: CategoryEntity[];
}
