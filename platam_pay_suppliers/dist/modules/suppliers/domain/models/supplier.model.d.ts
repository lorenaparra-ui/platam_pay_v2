export interface Supplier {
    id: number;
    externalId: string;
    businessId: number;
    bankAccount: string | null;
    createdAt: Date;
    updatedAt: Date;
}
