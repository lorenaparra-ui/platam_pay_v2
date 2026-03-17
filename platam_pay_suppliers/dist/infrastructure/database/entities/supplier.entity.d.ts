import { BaseExternalIdEntity } from "./base-external-id.entity";
export declare class SupplierEntity extends BaseExternalIdEntity {
    businessId: number;
    bankAccount: string | null;
}
