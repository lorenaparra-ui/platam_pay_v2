import type { OnboardingContextCommand } from './onboarding-context.command';
import type { SalesRepOpinionCommand } from './sales-rep-opinion.command';

export interface CreateSalesRepNaturalOpinionCommand {
  context: OnboardingContextCommand;
  opinion: SalesRepOpinionCommand;
}

export interface CreateSalesRepLegalOpinionCommand {
  context: OnboardingContextCommand;
  opinion: SalesRepOpinionCommand;
}
