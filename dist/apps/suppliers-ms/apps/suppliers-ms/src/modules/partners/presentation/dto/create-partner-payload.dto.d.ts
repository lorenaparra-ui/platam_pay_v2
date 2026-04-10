export declare class OperatingUserPayloadDto {
    firstName: string;
    lastName: string;
    docType: string;
    docNumber: string;
    phone?: string | null;
    email: string;
}
export declare class LegalRepresentativePayloadDto {
    firstName: string;
    lastName: string;
    docType: string;
    docNumber: string;
    phone?: string | null;
    email: string;
}
export declare class CreatePartnerBusinessPayloadDto {
    cityId?: string;
    cityExternalId?: string;
    entityType: string;
    businessName: string;
    businessAddress: string;
    businessType: string;
    legalName: string;
    tradeName: string;
    taxId: string;
    yearOfEstablishment: number;
    legalRepresentative: LegalRepresentativePayloadDto;
}
export declare class CreatePartnerPartnerSectionPayloadDto {
    acronym?: string | null;
    logoUrl?: string | null;
    coBrandingLogoUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    lightColor?: string | null;
    notificationEmail?: string | null;
    webhookUrl?: string | null;
    sendSalesRepVoucher?: boolean;
    disbursementNotificationEmail?: string | null;
}
export declare class CreatePartnerBankAccountPayloadDto {
    bankEntity: string;
    accountNumber: string;
}
export declare class CreatePartnerCreditFacilityPayloadDto {
    contractId?: string | null;
    totalLimit: string;
}
export declare class PartnerCategoryPayloadDto {
    name: string;
    discountPercentage: number;
    interestRate: number;
    disbursementFeePercent?: number | null;
    minimumDisbursementFee?: number | null;
    delayDays: number;
    termDays: number;
}
export declare class CreatePartnerPayloadDto {
    operatingUser: OperatingUserPayloadDto;
    business: CreatePartnerBusinessPayloadDto;
    partner: CreatePartnerPartnerSectionPayloadDto;
    bankAccount: CreatePartnerBankAccountPayloadDto;
    creditFacility: CreatePartnerCreditFacilityPayloadDto;
    category: PartnerCategoryPayloadDto[];
    countryCode?: string | null;
}
