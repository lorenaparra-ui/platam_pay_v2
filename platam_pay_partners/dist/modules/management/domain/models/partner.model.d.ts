export interface Partner {
    id: number;
    externalId: string;
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
    defaultCategoryId: number | null;
    statusId: number;
    createdAt: Date;
    updatedAt: Date;
}
