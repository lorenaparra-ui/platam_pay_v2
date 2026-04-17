import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class PurchaseOrderEntity extends BaseExternalIdEntity {
    userId: string;
    supplierId: number;
    amount: string;
    documentUrl: string | null;
}
