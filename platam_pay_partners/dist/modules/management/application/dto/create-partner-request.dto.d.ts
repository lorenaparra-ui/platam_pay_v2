declare class CreatePartnerInlineCategoryRequestDto {
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent?: string;
    minimumDisbursementFee?: string;
    delayDays: number;
    termDays: number;
}
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
    defaultCategoryId?: number;
    statusId?: number;
    categories?: CreatePartnerInlineCategoryRequestDto[];
    defaultCategoryIndex?: number;
}
export {};
