export interface PartnerLogoUploadRequestedPayload {
    correlation_id: string;
    partner_external_id?: string;
    business_id: number;
    business_external_id: string;
    logo_buffer: Buffer;
    logo_content_type: string;
    logo_filename: string;
    co_branding_logo_buffer: Buffer;
    co_branding_logo_content_type: string;
    co_branding_logo_filename: string;
}
export interface PartnerLogoUploadCompletedPayload {
    correlation_id: string;
    business_id: number;
    logo_url: string;
    co_branding_logo_url: string;
}
export interface PartnerCategoriesCreateRequestedPayload {
    correlation_id: string;
    partner_id: number;
    partner_external_id: string;
    business_id: number;
    categories: PartnerCategoryEventItem[];
}
export interface PartnerCategoryEventItem {
    name: string;
    term_days: number;
    delay_days: number;
    discount_percentage: number;
    interest_rate: number;
    disbursement_fee_percent: number;
    minimum_disbursement_fee: number;
}
export interface PartnerUserCreateRequestedPayload {
    correlation_id: string;
    partner_external_id: string;
    business_id: number;
    first_name: string;
    last_name: string;
    document_type: string;
    document_number: string;
    email: string;
    phone: string;
}
export declare const PARTNER_EVENTS: {
    readonly LOGO_UPLOAD_REQUESTED: "partner.logo.upload.requested";
    readonly LOGO_UPLOAD_COMPLETED: "partner.logo.upload.completed";
    readonly LOGO_UPLOAD_FAILED: "partner.logo.upload.failed";
    readonly CATEGORIES_CREATE_REQUESTED: "partner.categories.create.requested";
    readonly USER_CREATE_REQUESTED: "partner.user.create.requested";
};
export type PartnerEventName = (typeof PARTNER_EVENTS)[keyof typeof PARTNER_EVENTS];
