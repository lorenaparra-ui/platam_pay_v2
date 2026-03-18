import { BusinessInformationDto, FinancialInformationDto, OnboardingContextDto, PersonInformationDto } from '../base';
export declare class ShareholderItemDto {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    percent: number;
}
export declare class CreateLegalEntityOnboardingRequestDto {
    context: OnboardingContextDto;
    companyName: string;
    yearOfEstablishment: number;
    legalRepresentative: PersonInformationDto;
    business: BusinessInformationDto;
    financial: FinancialInformationDto;
    shareholders: ShareholderItemDto[];
}
