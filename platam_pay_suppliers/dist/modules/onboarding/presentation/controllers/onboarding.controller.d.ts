import { CreateNaturalPersonOnboardingUseCase } from '@onboarding/application/use-cases/create-natural-person-onboarding.use-case';
import { CreateSalesRepNaturalOpinionUseCase } from '@onboarding/application/use-cases/create-sales-rep-natural-opinion.use-case';
import { CreateNaturalPersonOnboardingRequestDto } from '../dto/natural-person/create-natural-person-onboarding-request.dto';
import { CreateSalesRepNaturalOpinionRequestDto } from '../dto/sales-rep/create-sales-rep-natural-opinion-request.dto';
export declare class OnboardingController {
    private readonly createNaturalPersonOnboardingUseCase;
    private readonly createSalesRepNaturalOpinionUseCase;
    constructor(createNaturalPersonOnboardingUseCase: CreateNaturalPersonOnboardingUseCase, createSalesRepNaturalOpinionUseCase: CreateSalesRepNaturalOpinionUseCase);
    createNaturalPerson(dto: CreateNaturalPersonOnboardingRequestDto): Promise<{
        acknowledged: boolean;
    }>;
    createSalesRepNaturalOpinion(dto: CreateSalesRepNaturalOpinionRequestDto): Promise<{
        acknowledged: boolean;
    }>;
    private toNaturalPersonCommand;
    private toSalesRepNaturalOpinionCommand;
}
