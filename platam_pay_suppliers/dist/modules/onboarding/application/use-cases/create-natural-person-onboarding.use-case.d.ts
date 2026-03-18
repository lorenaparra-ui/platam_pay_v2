import type { CreateNaturalPersonOnboardingCommand } from '@onboarding/application/commands/create-natural-person-onboarding.command';
export declare class CreateNaturalPersonOnboardingUseCase {
    execute({ context, applicant, business, financial, isPartnerClient }: CreateNaturalPersonOnboardingCommand): Promise<{
        acknowledged: boolean;
    }>;
}
