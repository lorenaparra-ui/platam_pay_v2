import { Module } from '@nestjs/common';
import { OnboardingController } from './presentation/controllers/onboarding.controller';
import { CreateNaturalPersonOnboardingUseCase } from './application/use-cases/create-natural-person-onboarding.use-case';
import { CreateSalesRepNaturalOpinionUseCase } from './application/use-cases/create-sales-rep-natural-opinion.use-case';

@Module({
  controllers: [OnboardingController],
  providers: [
    CreateNaturalPersonOnboardingUseCase,
    CreateSalesRepNaturalOpinionUseCase,
  ],
  exports: [
    CreateNaturalPersonOnboardingUseCase,
    CreateSalesRepNaturalOpinionUseCase,
  ],
})
export class OnboardingModule {}
