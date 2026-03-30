import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { create_sqs_client, QUEUES_CONFIG, SQS_CLIENT, type SqsQueuesUrlsConfig } from '@platam/shared';


import { SqsMessagePublisherAdapter } from './adapters/sqs-message-publisher.adapter';
import { ConfigOutboundTransversalQueueUrlAdapter } from './adapters/config-outbound-transversal-queue-url.adapter';
import { TransversalInboundSqsConsumer } from './consumers/transversal-inbound-sqs.consumer';
import { UploadFilesSqsConsumer } from './consumers/upload-files.consumer';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { TransversalUploadModule } from '@modules/transversal/transversal-upload.module';
import { OUTBOUND_MESSAGE_PUBLISHER_PORT } from '@messaging/domain/ports/outbound-message-publisher.port';
import { TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT } from '@messaging/domain/ports/transversal-outbound-queue-url.port';

@Global()
@Module({
  imports: [ConfigModule, MessagingApplicationModule, TransversalUploadModule],
  providers: [
    {
      provide: QUEUES_CONFIG,
      useFactory: (config_service: ConfigService): SqsQueuesUrlsConfig => ({
        outbound_queue_url: config_service.getOrThrow<string>('sqs.outbound_queue_url'),
        inbound_queue_url: config_service.get<string>('sqs.inbound_queue_url'),
        upload_files_queue_url: config_service.get<string>('sqs.upload_files_queue_url'),
      }),
      inject: [ConfigService],
    },
    {
      provide: SQS_CLIENT,
      useFactory: (config_service: ConfigService) =>
        create_sqs_client({
          region: config_service.getOrThrow<string>('sqs.region'),
          /** Cadena estándar del SDK: variables env, perfil, SSO, rol asumido, etc. */
          credentials: fromNodeProviderChain(),
          /** Solo colas en la región configurada (endpoint regional AWS; sin LocalStack). */
          use_queue_url_as_endpoint: false,
        }),
      inject: [ConfigService],
    },
    SqsMessagePublisherAdapter,
    TransversalInboundSqsConsumer,
    UploadFilesSqsConsumer,
    {
      provide: OUTBOUND_MESSAGE_PUBLISHER_PORT,
      useExisting: SqsMessagePublisherAdapter,
    },
    ConfigOutboundTransversalQueueUrlAdapter,
    {
      provide: TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
      useExisting: ConfigOutboundTransversalQueueUrlAdapter,
    },
  ],
  exports: [
    SQS_CLIENT,
    QUEUES_CONFIG,
    OUTBOUND_MESSAGE_PUBLISHER_PORT,
    TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
  ],
})
export class SqsModule {}
