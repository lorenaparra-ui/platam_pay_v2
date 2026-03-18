import { Supplier } from "../models/supplier.model";
export declare const SUPPLIER_REPOSITORY = "SUPPLIER_REPOSITORY";
export interface CreateSupplierPayload {
    businessId: number;
    bankAccount?: string | null;
}
export interface UpdateSupplierPayload {
    bankAccount?: string | null;
}
export interface SupplierRepositoryPort {
    findAll(): Promise<Supplier[]>;
    findById(id: number): Promise<Supplier | null>;
    findByExternalId(externalId: string): Promise<Supplier | null>;
    findByBusinessId(businessId: number): Promise<Supplier | null>;
    create(payload: CreateSupplierPayload): Promise<Supplier>;
    updateByExternalId(externalId: string, payload: UpdateSupplierPayload): Promise<Supplier | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
