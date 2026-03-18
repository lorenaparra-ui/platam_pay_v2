export interface PurchaseOrder {
    id: number;
    externalId: string;
    userId: string;
    supplierId: number;
    amount: string;
    documentUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}
