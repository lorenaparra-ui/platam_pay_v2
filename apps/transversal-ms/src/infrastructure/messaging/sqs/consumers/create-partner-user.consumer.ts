import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SQSClient } from '@aws-sdk/client-sqs';
import { IngestPartnerCreateUserSqsMessageUseCase } from '@modules/users/application/use-cases/partner-create-user/ingest-partner-create-user-sqs-message.use-case';
import {
  BaseConsumer,
  QUEUES_CONFIG,
  SQS_CLIENT,
  type SqsQueuesUrlsConfig,
  type SqsReceivedMessage,
} from '@platam/shared';

@Injectable()
export class CreatePartnerUserSqsConsumer
  extends BaseConsumer
  implements OnModuleInit, OnModuleDestroy
{
  private readonly nest_logger = new Logger(CreatePartnerUserSqsConsumer.name);

  constructor(
    @Inject(SQS_CLIENT) sqs_client: SQSClient,
    @Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig,
    private readonly config_service: ConfigService,
    private readonly ingest: IngestPartnerCreateUserSqsMessageUseCase,
  ) {
    super(sqs_client, {
      log: (m) => this.nest_logger.log(m),
      warn: (m) => this.nest_logger.warn(m),
      error: (m) => this.nest_logger.error(m),
    });
  }

  onModuleInit(): void {
    this.start();
  }

  onModuleDestroy(): void {
    this.stop();
  }

  protected resolve_queue_url(): string | undefined {
    return this.queues_config.create_partner_user_queue_url;
  }

  protected get_poll_settings() {
    return {
      wait_time_seconds: this.config_service.getOrThrow<number>('sqs.wait_time_seconds'),
      max_number_of_messages: this.config_service.getOrThrow<number>('sqs.max_number_of_messages'),
      visibility_timeout_seconds: this.config_service.getOrThrow<number>(
        'sqs.visibility_timeout_seconds',
      ),
    };
  }

  protected inactive_reason_message(): string {
    return 'Cola create-partner-user SQS no configurada (TRANSVERSAL_SQS_CREATE_USER_QUEUE_URL); worker inactivo. Configure DLQ y maxReceiveCount en la cola.';
  }

  protected async handle(message: SqsReceivedMessage): Promise<boolean> {
    const delete_on_validation_error =
      this.config_service.get<boolean>('sqs.delete_on_validation_error') ?? false;
    this.nest_logger.log(
      `[CreatePartnerUser][step=consumer_handle][messageId=${message.message_id ?? 'n/a'}]`,
    );
    return this.ingest.execute({
      body: message.body,
      delete_on_validation_error,
    });
  }
}
