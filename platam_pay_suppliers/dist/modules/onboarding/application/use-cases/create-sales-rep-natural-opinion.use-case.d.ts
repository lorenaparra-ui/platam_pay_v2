import type { CreateSalesRepNaturalOpinionCommand } from '@onboarding/application/commands';
export declare class CreateSalesRepNaturalOpinionUseCase {
    execute(command: CreateSalesRepNaturalOpinionCommand): Promise<{
        acknowledged: boolean;
    }>;
}
