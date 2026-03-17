export declare class CreatePartnerRequestDto {
    businessId: number;
    acronym: string;
    logoUrl?: string;
    coBrandingLogoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    lightColor?: string;
    salesRepRoleName?: string;
    salesRepRoleNamePlural?: string;
    notificationEmail?: string;
    webhookUrl?: string;
    sendSalesRepVoucher?: boolean;
    disbursementNotificationEmail?: string;
    defaultRepId?: number;
    statusId?: number;
}
