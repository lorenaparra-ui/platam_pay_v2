import { PartnerCategoryDto } from "./category.dto";
export declare class CreatePartnerFullRequestDto {
    countryCode: string;
    legalName: string;
    tradeName: string;
    acronym: string;
    taxId: string;
    alias: string;
    cityId: string;
    businessAddress: string;
    yearOfEstablishment: number;
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone?: string;
    notificationEmail: string;
    webhookUrl?: string;
    disbursementNotificationEmail?: string;
    sendSalesRepVoucher: boolean;
    primaryColor?: string;
    secondaryColor?: string;
    lightColor?: string;
    categories: PartnerCategoryDto[];
}
