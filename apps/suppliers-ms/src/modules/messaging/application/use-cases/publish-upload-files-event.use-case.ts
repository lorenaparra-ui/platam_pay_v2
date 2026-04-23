import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT,
  type TransversalUploadFilesQueueUrlPort,
} from '@messaging/domain/ports/transversal-upload-files-queue-url.port';
import { ValidationFailedError } from '../exceptions/validation-failed.error';

export type PublishUploadFilesCommand = Readonly<{
  correlation_id: string;
  idempotency_key: string;
  files: Readonly<{
    bank_certification?: string;
    logo?: string;
    co_branding?: string;
  }>;
  /** Carpeta lógica por archivo (debe coincidir con el mapeo de files-uploaded). */
  file_folders?: Readonly<{
    bank_certification?: string;
    logo?: string;
    co_branding?: string;
  }>;
}>;

type File_slot = 'bank_certification' | 'logo' | 'co_branding';

/**
 * Publica el contrato upload-files (v1.0) hacia la cola dedicada (transversal-ms).
 */
@Injectable()
export class PublishUploadFilesEventUseCase {
  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly message_publisher: OutboundMessagePublisherPort,
    @Inject(TRANSVERSAL_UPLOAD_FILES_QUEUE_URL_PORT)
    private readonly upload_queue_url: TransversalUploadFilesQueueUrlPort,
    private readonly config_service: ConfigService,
  ) {}

  async execute(command: PublishUploadFilesCommand): Promise<void> {
    const queue_url = this.upload_queue_url.get_upload_files_queue_url();
    if (queue_url === undefined || queue_url.trim().length === 0) {
      throw new ValidationFailedError(
        'Cola TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL no configurada para publish upload-files',
      );
    }

    const bucket = (this.config_service.get<string>('config.storage.s3.bucket') ?? '').trim();
    if (bucket.length === 0) {
      throw new ValidationFailedError(
        'Bucket S3 no configurado (config.storage.s3.bucket / AWS_S3_BUCKET)',
      );
    }

    const payload_files: { file: string; folder: string }[] = [];
    const add = (slot: File_slot, raw?: string) => {
      if (typeof raw !== 'string' || raw.trim().length === 0) {
        return;
      }
      const folder = this.folder_for_slot(command.file_folders, slot);
      if (folder.length === 0) {
        throw new ValidationFailedError(`folder no definido para slot ${slot}`);
      }
      payload_files.push({ file: raw, folder });
    };
    add('bank_certification', command.files.bank_certification);
    add('logo', command.files.logo);
    add('co_branding', command.files.co_branding);

    if (payload_files.length === 0) {
      throw new ValidationFailedError('upload-files sin archivos en payload');
    }

    const body = JSON.stringify({
      event: 'upload-files',
      version: '1.0',
      correlationId: command.correlation_id,
      idempotencyKey: command.idempotency_key,
      payload: {
        bucket,
        files: payload_files,
      },
    });

    await this.message_publisher.publish({ queue_url, body });
  }

  private folder_for_slot(
    folders: PublishUploadFilesCommand['file_folders'] | undefined,
    slot: File_slot,
  ): string {
    const raw =
      folders === undefined
        ? undefined
        : slot === 'bank_certification'
          ? folders.bank_certification
          : slot === 'logo'
            ? folders.logo
            : folders.co_branding;
    if (typeof raw !== 'string') {
      return '';
    }
    return raw.trim();
  }
}
