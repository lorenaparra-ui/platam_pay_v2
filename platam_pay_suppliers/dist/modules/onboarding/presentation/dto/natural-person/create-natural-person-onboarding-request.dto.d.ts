import { BusinessInformationDto, FinancialInformationDto, OnboardingContextDto, PersonInformationDto } from '../base';
export declare class CreateNaturalPersonOnboardingRequestDto {
    context: OnboardingContextDto;
    applicant: PersonInformationDto;
    business: BusinessInformationDto;
    financial: FinancialInformationDto;
    isPartnerClient: boolean;
}
