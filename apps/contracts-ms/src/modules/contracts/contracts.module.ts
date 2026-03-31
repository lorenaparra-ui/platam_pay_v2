import { Module } from '@nestjs/common';
import { ContractsApplicationModule } from './contracts-application.module';
import { ContractsController } from './presentation/contracts.controller';

@Module({
  imports: [ContractsApplicationModule],
  controllers: [ContractsController],
})
export class ContractsModule {}
