import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SQSClient } from '@aws-sdk/client-sqs';
import { IngestUploadFilesSqsMessageUseCase } from '@modules/transversal/application/use-cases/ingest-upload-files-sqs-message.use-case';
import {
  BaseConsumer,
  QUEUES_CONFIG,
  SQS_CLIENT,
  type SqsQueuesUrlsConfig,
  type SqsReceivedMessage,
} from '@platam/shared';

@Injectable()
export class UploadFilesSqsConsumer extends BaseConsumer implements OnModuleInit, OnModuleDestroy {
  private readonly nest_logger = new Logger(UploadFilesSqsConsumer.name);

  constructor(
    @Inject(SQS_CLIENT) sqs_client: SQSClient,
    @Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig,
    private readonly config_service: ConfigService,
    private readonly ingest_upload_files: IngestUploadFilesSqsMessageUseCase,
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
    return this.queues_config.upload_files_queue_url;
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
    return 'Cola upload-files SQS no configurada (TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL); worker inactivo. Configure DLQ y maxReceiveCount en la cola para mensajes irrecuperables.';
  }

  protected async handle(message: SqsReceivedMessage): Promise<boolean> {
    const delete_on_validation_error =
      this.config_service.get<boolean>('sqs.delete_on_validation_error') ?? false;
    this.nest_logger.log(
      `[UploadFiles][step=consumer_handle][messageId=${message.message_id ?? 'n/a'}]`,
    );
    return this.ingest_upload_files.execute({
      body: message.body,
      delete_on_validation_error,
    });
  }
}
