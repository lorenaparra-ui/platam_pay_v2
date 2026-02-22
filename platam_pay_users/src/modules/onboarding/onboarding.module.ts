import { Module } from '@nestjs/common';
import { TransversalModule } from '../transversal/transversal.module';
import { OnboardingController } from './onboarding.controller';

@Module({
  imports: [TransversalModule],
  controllers: [OnboardingController],
})
export class OnboardingModule {}
