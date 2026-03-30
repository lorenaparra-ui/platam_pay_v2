import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { create_sqs_client, QUEUES_CONFIG, SQS_CLIENT, type SqsQueuesUrlsConfig } from '@platam/shared';

import { SqsMessagePublisherAdapter } from './adapters/sqs-message-publisher.adapter';
import { ConfigOutboundProductsQueueUrlAdapter } from './adapters/config-outbound-products-queue-url.adapter';
import { ProductsInboundSqsConsumer } from './consumers/products-inbound-sqs.consumer';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { OUTBOUND_MESSAGE_PUBLISHER_PORT } from '@messaging/domain/ports/outbound-message-publisher.port';
import { PRODUCTS_OUTBOUND_QUEUE_URL_PORT } from '@messaging/domain/ports/products-outbound-queue-url.port';

@Global()
@Module({
  imports: [ConfigModule, MessagingApplicationModule],
  providers: [
    {
      provide: QUEUES_CONFIG,
      useFactory: (config_service: ConfigService): SqsQueuesUrlsConfig => ({
        outbound_queue_url: config_service.getOrThrow<string>('sqs.outbound_queue_url'),
        inbound_queue_url: config_service.get<string>('sqs.inbound_queue_url'),
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
    ProductsInboundSqsConsumer,
    {
      provide: OUTBOUND_MESSAGE_PUBLISHER_PORT,
      useExisting: SqsMessagePublisherAdapter,
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
    PRODUCTS_OUTBOUND_QUEUE_URL_PORT,
  ],
})
export class SqsModule {}
