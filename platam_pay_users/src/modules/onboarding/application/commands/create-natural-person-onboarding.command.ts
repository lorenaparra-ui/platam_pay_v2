import type { BusinessInformationCommand } from './business-information.command';
import type { FinancialInformationCommand } from './financial-information.command';
import type { OnboardingContextCommand } from './onboarding-context.command';
import type { PersonInformationCommand } from './person-information.command';

export interface CreateNaturalPersonOnboardingCommand {
  context: OnboardingContextCommand;
  applicant: PersonInformationCommand;
  business: BusinessInformationCommand;
  financial: FinancialInformationCommand;
  isPartnerClient: boolean;
}
