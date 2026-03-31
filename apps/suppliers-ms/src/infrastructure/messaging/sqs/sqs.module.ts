import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { create_sqs_client, QUEUES_CONFIG, SQS_CLIENT, type SqsQueuesUrlsConfig } from '@platam/shared';

import { SqsMessagePublisherAdapter } from './adapters/sqs-message-publisher.adapter';
import { ConfigOutboundTransversalQueueUrlAdapter } from './adapters/config-outbound-transversal-queue-url.adapter';
import { ConfigOutboundProductsQueueUrlAdapter } from './adapters/config-outbound-products-queue-url.adapter';
import { TransversalInboundSqsConsumer } from './consumers/transversal-inbound-sqs.consumer';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { OUTBOUND_MESSAGE_PUBLISHER_PORT } from '@messaging/domain/ports/outbound-message-publisher.port';
import { TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT } from '@messaging/domain/ports/transversal-outbound-queue-url.port';
import { PRODUCTS_OUTBOUND_QUEUE_URL_PORT } from '@messaging/domain/ports/products-outbound-queue-url.port';
import { TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT } from '@messaging/domain/ports/transversal-upload-files-queue-url.port';
import { ConfigTransversalUploadFilesQueueUrlAdapter } from './adapters/config-transversal-upload-files-queue-url.adapter';
import { TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT } from '@messaging/domain/ports/transversal-create-partner-user-queue-url.port';
import { ConfigTransversalCreatePartnerUserQueueUrlAdapter } from './adapters/config-transversal-create-partner-user-queue-url.adapter';
import { PublishProductsEventUseCase } from '@messaging/application/use-cases/publish-products-event.use-case';

@Global()
@Module({
  imports: [ConfigModule, MessagingApplicationModule],
  providers: [
    {
      provide: QUEUES_CONFIG,
      useFactory: (config_service: ConfigService): SqsQueuesUrlsConfig => ({
        outbound_queue_url: config_service.getOrThrow<string>('sqs.outbound_queue_url'),
        inbound_queue_url: config_service.get<string>('sqs.inbound_queue_url'),
        upload_files_queue_url: config_service.get<string>('sqs.upload_files_queue_url'),
        create_partner_user_queue_url: config_service.get<string>('sqs.create_partner_user_queue_url'),
        suppliers_callback_queue_url: config_service.get<string>('sqs.suppliers_callback_queue_url'),
      }),
      inject: [ConfigService],
    },
    {
      provide: SQS_CLIENT,
      useFactory: (config_service: ConfigService) =>
        create_sqs_client({
          region: config_service.getOrThrow<string>('sqs.region'),
          endpoint: config_service.get<string>('sqs.endpoint'),
        }),
      inject: [ConfigService],
    },
    SqsMessagePublisherAdapter,
    TransversalInboundSqsConsumer,
    PublishProductsEventUseCase,
    {
      provide: OUTBOUND_MESSAGE_PUBLISHER_PORT,
      useExisting: SqsMessagePublisherAdapter,
    },
    ConfigOutboundTransversalQueueUrlAdapter,
    ConfigTransversalUploadFilesQueueUrlAdapter,
    ConfigTransversalCreatePartnerUserQueueUrlAdapter,
    {
      provide: TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
      useExisting: ConfigOutboundTransversalQueueUrlAdapter,
    },
    {
      provide: TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT,
      useExisting: ConfigTransversalUploadFilesQueueUrlAdapter,
    },
    {
      provide: TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT,
      useExisting: ConfigTransversalCreatePartnerUserQueueUrlAdapter,
    },
    ConfigOutboundProductsQueueUrlAdapter,
    {
      provide: PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
      useExisting: ConfigOutboundProductsQueueUrlAdapter,
    },
  ],
  exports: [
    SQS_CLIENT,
    QUEUES_CONFIG,
    OUTBOUND_MESSAGE_PUBLISHER_PORT,
    TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
    TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT,
    TRANSVERSAL_CREATE_PARTNER_USER_QUEUE_URL_PORT,
    PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
    PublishProductsEventUseCase,
  ],
})
export class SqsModule {}
