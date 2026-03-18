import { PurchaseOrder } from "../models/purchase-order.model";
export declare const PURCHASE_ORDER_REPOSITORY = "PURCHASE_ORDER_REPOSITORY";
export interface CreatePurchaseOrderPayload {
    userId: string;
    supplierId: number;
    amount: string;
    documentUrl?: string | null;
}
export interface PurchaseOrderRepositoryPort {
    findAll(): Promise<PurchaseOrder[]>;
    findById(id: number): Promise<PurchaseOrder | null>;
    findByExternalId(externalId: string): Promise<PurchaseOrder | null>;
    findBySupplierId(supplierId: number): Promise<PurchaseOrder[]>;
    create(payload: CreatePurchaseOrderPayload): Promise<PurchaseOrder>;
}
