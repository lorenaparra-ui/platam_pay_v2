import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingEntity } from '@libs/database';
import { OnboardingController } from './presentation/controllers/onboarding.controller';
import { CreateNaturalPersonOnboardingUseCase } from './application/use-cases/create-natural-person-onboarding.use-case';
import { CreateSalesRepNaturalOpinionUseCase } from './application/use-cases/create-sales-rep-natural-opinion.use-case';
import { TypeOrmOnboardingRepository } from '@infrastructure/database/repositories/typeorm-onboarding.repository';
import { ONBOARDING_REPOSITORY } from './domain/ports/onboarding.repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([OnboardingEntity])],
  controllers: [OnboardingController],
  providers: [
    {
      provide: ONBOARDING_REPOSITORY,
      useClass: TypeOrmOnboardingRepository,
    },
    CreateNaturalPersonOnboardingUseCase,
    CreateSalesRepNaturalOpinionUseCase,
  ],
  exports: [
    ONBOARDING_REPOSITORY,
    CreateNaturalPersonOnboardingUseCase,
    CreateSalesRepNaturalOpinionUseCase,
  ],
})
export class OnboardingModule {}
