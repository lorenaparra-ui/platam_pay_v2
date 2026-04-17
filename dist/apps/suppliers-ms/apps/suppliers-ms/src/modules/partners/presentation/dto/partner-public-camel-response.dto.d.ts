import type { PartnerPublicFields } from '@modules/partners/application/mapping/partner-public-fields.builder';
export declare class PartnerPublicCamelResponseDto {
    externalId: string;
    supplierExternalId: string;
    acronym: string | null;
    logoUrl: string | null;
    coBrandingLogoUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    lightColor: string | null;
    notificationEmail: string | null;
    webhookUrl: string | null;
    sendSalesRepVoucher: boolean;
    disbursementNotificationEmail: string | null;
    state: string;
    createdAt: Date;
    updatedAt: Date;
    static from(fields: PartnerPublicFields): PartnerPublicCamelResponseDto;
}
