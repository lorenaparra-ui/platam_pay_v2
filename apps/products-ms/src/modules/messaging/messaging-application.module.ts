import { Module } from '@nestjs/common';
import { PublishProductsEventUseCase } from './application/use-cases/publish-products-event.use-case';
import { ProcessProductsInboundMessageUseCase } from './application/use-cases/process-products-inbound-message.use-case';
import { IngestProductsInboundSqsMessageUseCase } from './application/use-cases/ingest-products-inbound-sqs-message.use-case';
import { CreditFacilitiesApplicationModule } from '@modules/credit-facilities/credit-facilities-application.module';
import { CategoriesApplicationModule } from '@modules/categories/categories-application.module';

@Module({
  imports: [CreditFacilitiesApplicationModule, CategoriesApplicationModule],
  providers: [
    PublishProductsEventUseCase,
    ProcessProductsInboundMessageUseCase,
    IngestProductsInboundSqsMessageUseCase,
  ],
  exports: [
    PublishProductsEventUseCase,
    ProcessProductsInboundMessageUseCase,
    IngestProductsInboundSqsMessageUseCase,
  ],
})
export class MessagingApplicationModule {}
