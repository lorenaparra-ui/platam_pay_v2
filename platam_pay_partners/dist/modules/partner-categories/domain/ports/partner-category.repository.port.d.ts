import { PartnerCategory } from "../models/partner-category.model";
export declare const PARTNER_CATEGORIES_REPOSITORY = "PARTNER_CATEGORIES_REPOSITORY";
export interface CreatePartnerCategoryPayload {
    partnerExternalId: string;
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent?: string | null;
    minimumDisbursementFee?: string | null;
    delayDays: number;
    termDays: number;
    statusId?: number;
}
export interface UpdatePartnerCategoryPayload {
    name?: string;
    discountPercentage?: string;
    interestRate?: string;
    disbursementFeePercent?: string | null;
    minimumDisbursementFee?: string | null;
    delayDays?: number;
    termDays?: number;
    statusId?: number;
}
export interface PartnerCategoryRepositoryPort {
    findAll(partnerExternalId?: string): Promise<PartnerCategory[]>;
    findByExternalId(externalId: string): Promise<PartnerCategory | null>;
    findByPartnerExternalId(partnerExternalId: string): Promise<PartnerCategory[]>;
    create(payload: CreatePartnerCategoryPayload): Promise<PartnerCategory | null>;
    updateByExternalId(externalId: string, payload: UpdatePartnerCategoryPayload): Promise<PartnerCategory | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
