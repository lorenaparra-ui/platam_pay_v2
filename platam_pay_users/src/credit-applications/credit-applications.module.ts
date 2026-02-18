import { Module } from '@nestjs/common';
import { TransversalModule } from '../transversal/transversal.module';
import { CreditApplicationsController } from './credit-applications.controller';

@Module({
  imports: [TransversalModule],
  controllers: [CreditApplicationsController],
})
export class CreditApplicationsModule {}
