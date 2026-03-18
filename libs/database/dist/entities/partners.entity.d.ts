import { BaseExternalIdEntity } from "./base-external-id.entity";
/**
 * Partner operativo. Nombre comercial / razón social: tabla `businesses` vinculada por business_id.
 */
export declare class PartnersEntity extends BaseExternalIdEntity {
    businessId: number;
    acronym: string | null;
    logoUrl: string | null;
    coBrandingLogoUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    lightColor: string | null;
    salesRepRoleName: string | null;
    salesRepRoleNamePlural: string | null;
    apiKeyHash: boolean | null;
    notificationEmail: string | null;
    webhookUrl: string | null;
    sendSalesRepVoucher: boolean;
    disbursementNotificationEmail: string | null;
    defaultRepId: number | null;
    statusId: number;
}
