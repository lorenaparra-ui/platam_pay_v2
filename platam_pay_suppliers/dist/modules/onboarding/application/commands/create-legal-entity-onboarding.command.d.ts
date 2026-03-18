import type { BusinessInformationCommand } from './business-information.command';
import type { FinancialInformationCommand } from './financial-information.command';
import type { OnboardingContextCommand } from './onboarding-context.command';
import type { PersonInformationCommand } from './person-information.command';
export interface ShareholderItemCommand {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    percent: number;
}
export interface CreateLegalEntityOnboardingCommand {
    context: OnboardingContextCommand;
    companyName: string;
    yearOfEstablishment: number;
    legalRepresentative: PersonInformationCommand;
    business: BusinessInformationCommand;
    financial: FinancialInformationCommand;
    shareholders: ShareholderItemCommand[];
}
