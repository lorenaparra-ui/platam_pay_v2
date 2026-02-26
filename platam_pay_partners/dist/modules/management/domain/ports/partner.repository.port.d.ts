import { Partner } from "../models/partner.model";
export declare const PARTNERS_REPOSITORY = "PARTNERS_REPOSITORY";
export interface PartnerRepositoryPort {
    findAll(): Promise<Partner[]>;
    findById(id: number): Promise<Partner | null>;
    findByExternalId(externalId: string): Promise<Partner | null>;
}
