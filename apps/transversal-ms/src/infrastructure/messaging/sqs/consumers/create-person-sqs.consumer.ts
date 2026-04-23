import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SQSClient } from '@aws-sdk/client-sqs';
import { IngestCreatePersonSqsMessageUseCase } from '@modules/persons/application/use-cases/ingest-create-person-sqs/ingest-create-person-sqs-message.use-case';
import {
  BaseConsumer,
  QUEUES_CONFIG,
  SQS_CLIENT,
  type SqsQueuesUrlsConfig,
  type SqsReceivedMessage,
} from '@platam/shared';

/**
 * Consume mensajes de TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL.
 * Solo crea la Persona (sin crear Usuario asociado).
 */
@Injectable()
export class CreatePersonSqsConsumer
  extends BaseConsumer
  implements OnModuleInit, OnModuleDestroy
{
  private readonly nest_logger = new Logger(CreatePersonSqsConsumer.name);

  constructor(
    @Inject(SQS_CLIENT) sqs_client: SQSClient,
    @Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig,
    private readonly config_service: ConfigService,
    private readonly ingest: IngestCreatePersonSqsMessageUseCase,
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
    return this.queues_config.create_person_queue_url;
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
    return 'Cola create-person SQS no configurada (TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL); worker inactivo.';
  }

  protected async handle(message: SqsReceivedMessage): Promise<boolean> {
    const delete_on_validation_error =
      this.config_service.get<boolean>('sqs.delete_on_validation_error') ?? false;
    this.nest_logger.log(
      `[CreatePerson][step=consumer_handle][messageId=${message.message_id ?? 'n/a'}]`,
    );
    return this.ingest.execute({
      body: message.body,
      delete_on_validation_error,
    });
  }
}
