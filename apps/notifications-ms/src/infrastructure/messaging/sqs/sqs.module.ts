import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  create_sqs_client,
  QUEUES_CONFIG,
  SQS_CLIENT,
  type SqsQueuesUrlsConfig,
} from '@platam/shared';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { NotificationInboundSqsConsumer } from './consumers/notification-inbound-sqs.consumer';

@Global()
@Module({
  imports: [ConfigModule, MessagingApplicationModule],
  providers: [
    {
      provide: QUEUES_CONFIG,
      useFactory: (config_service: ConfigService): SqsQueuesUrlsConfig => ({
        outbound_queue_url: config_service.getOrThrow<string>('sqs.outbound_queue_url'),
        notifications_inbound_queue_url: config_service.get<string>(
          'sqs.inbound_queue_url',
        ),
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
    NotificationInboundSqsConsumer,
  ],
  exports: [SQS_CLIENT, QUEUES_CONFIG],
})
export class SqsModule {}
