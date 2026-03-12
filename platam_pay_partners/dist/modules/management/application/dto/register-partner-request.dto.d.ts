export declare class RegisterPartnerCategoryItemDto {
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent?: string;
    minimumDisbursementFee?: string;
    delayDays: number;
    termDays: number;
}
export declare class RegisterPartnerRequestDto {
    countryCode: string;
    legalName: string;
    tradeName: string;
    acronym: string;
    taxId: string;
    alias?: string;
    cityId: string;
    businessAddress: string;
    yearOfEstablishment: number;
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
    notificationEmail?: string;
    webhookUrl?: string;
    disbursementNotificationEmail?: string;
    sendSalesRepVoucher?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
    lightColor?: string;
    categories?: RegisterPartnerCategoryItemDto[];
    defaultCategoryIndex?: number;
}
