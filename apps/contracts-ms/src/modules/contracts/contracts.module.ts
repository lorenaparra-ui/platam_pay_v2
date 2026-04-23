import { Module } from '@nestjs/common';
import { ContractsApplicationModule } from './contracts-application.module';
import { ContractsController } from './presentation/contracts.controller';
import { ZapSignWebhookController } from './presentation/zapsign-webhook.controller';

@Module({
  imports: [ContractsApplicationModule],
  controllers: [ContractsController, ZapSignWebhookController],
})
export class ContractsModule {}
