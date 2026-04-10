import { Statuses } from '@platam/shared';
import { PartnerCategoryPayloadDto } from './create-partner-payload.dto';
export declare class UpdateOperatingUserPayloadDto {
    firstName?: string;
    lastName?: string;
    docType?: string;
    docNumber?: string;
    phone?: string | null;
    email?: string;
}
export declare class UpdateLegalRepresentativePayloadDto {
    firstName?: string;
    lastName?: string;
    docType?: string;
    docNumber?: string;
    phone?: string | null;
    email?: string;
}
export declare class UpdateBusinessPayloadDto {
    cityId?: string | null;
    entityType?: string;
    businessName?: string | null;
    businessAddress?: string | null;
    businessType?: string | null;
    legalName?: string | null;
    tradeName?: string | null;
    taxId?: string | null;
    yearOfEstablishment?: number | null;
    legalRepresentative?: UpdateLegalRepresentativePayloadDto | null;
}
export declare class UpdatePartnerSectionPayloadDto {
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
    state?: Statuses;
}
export declare class UpdateBankAccountPayloadDto {
    bankEntity?: string;
    accountNumber?: string;
}
export declare class UpdateCreditFacilityPayloadDto {
    contractId?: string | null;
    totalLimit?: string;
}
export declare class UpdatePartnerPayloadDto {
    operatingUser?: UpdateOperatingUserPayloadDto;
    business?: UpdateBusinessPayloadDto;
    partner?: UpdatePartnerSectionPayloadDto;
    bankAccount?: UpdateBankAccountPayloadDto;
    creditFacility?: UpdateCreditFacilityPayloadDto;
    category?: PartnerCategoryPayloadDto[];
}
