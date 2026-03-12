import { Partner } from "../models/partner.model";
export declare const PARTNERS_REPOSITORY = "PARTNERS_REPOSITORY";
export type PartnerStatusCode = "active" | "inactive";
export interface CreatePartnerCategoryPayload {
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent?: string | null;
    minimumDisbursementFee?: string | null;
    delayDays: number;
    termDays: number;
}
export interface CreatePartnerPayload {
    businessId: number;
    acronym: string;
    logoUrl?: string | null;
    coBrandingLogoUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    lightColor?: string | null;
    salesRepRoleName?: string | null;
    salesRepRoleNamePlural?: string | null;
    notificationEmail?: string | null;
    webhookUrl?: string | null;
    sendSalesRepVoucher?: boolean;
    disbursementNotificationEmail?: string | null;
    defaultRepId?: number | null;
    defaultCategoryId?: number | null;
    statusId?: number;
    categories?: CreatePartnerCategoryPayload[];
    defaultCategoryIndex?: number;
}
export interface UpdatePartnerPayload {
    businessId?: number;
    acronym?: string | null;
    logoUrl?: string | null;
    coBrandingLogoUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    lightColor?: string | null;
    salesRepRoleName?: string | null;
    salesRepRoleNamePlural?: string | null;
    notificationEmail?: string | null;
    webhookUrl?: string | null;
    sendSalesRepVoucher?: boolean;
    disbursementNotificationEmail?: string | null;
    defaultRepId?: number | null;
    defaultCategoryId?: number | null;
    statusId?: number;
}
export interface PartnerRepositoryPort {
    findAll(search?: string): Promise<Partner[]>;
    findById(id: number): Promise<Partner | null>;
    findByExternalId(externalId: string): Promise<Partner | null>;
    create(payload: CreatePartnerPayload): Promise<Partner>;
    updateByExternalId(externalId: string, payload: UpdatePartnerPayload): Promise<Partner | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
    setStatusByExternalId(externalId: string, statusCode: PartnerStatusCode): Promise<Partner | null>;
}
