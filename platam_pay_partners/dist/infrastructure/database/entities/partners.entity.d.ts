import { BaseExternalIdEntity } from "./base-external-id.entity";
export declare class PartnersEntity extends BaseExternalIdEntity {
    countryCode: string | null;
    companyName: string;
    tradeName: string | null;
    acronym: string | null;
    logoUrl: string | null;
    coBrandingLogoUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    lightColor: string | null;
    salesRepRoleName: string | null;
    salesRepRoleNamePlural: string | null;
    apiKeyHash: string | null;
    notificationEmail: string | null;
    webhookUrl: string | null;
    sendSalesRepVoucher: boolean;
    disbursementNotificationEmail: string | null;
    defaultRepId: number | null;
    defaultCategoryId: number | null;
    statusId: number;
}
