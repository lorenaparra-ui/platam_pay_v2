import type { SalesRepresentative } from '../models/sales-representative.model';
export declare const SALES_REPRESENTATIVE_REPOSITORY = "SALES_REPRESENTATIVE_REPOSITORY";
export interface CreateSalesRepresentativePayload {
    partnerId: number;
    userId?: number | null;
    name: string;
    role: string;
    statusId: number;
}
export interface SalesRepresentativeRepositoryPort {
    findAll(): Promise<SalesRepresentative[]>;
    findById(id: number): Promise<SalesRepresentative | null>;
    findByExternalId(externalId: string): Promise<SalesRepresentative | null>;
    findByPartnerId(partnerId: number): Promise<SalesRepresentative[]>;
    findByUserId(userId: number): Promise<SalesRepresentative | null>;
    create(payload: CreateSalesRepresentativePayload): Promise<SalesRepresentative>;
}
