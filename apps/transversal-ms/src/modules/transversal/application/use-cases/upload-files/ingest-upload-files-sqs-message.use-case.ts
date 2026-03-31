import { Inject, Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { UseCase } from '@platam/shared';
import { PublishFilesUploadedEventUseCase } from '@messaging/application/use-cases/publish-files-uploaded-event.use-case';
import { UploadFilesInboundEventDto } from '../../dto/upload-files-inbound.dto';
import { UploadFilesUseCase } from './upload-files.use-case';
import { UploadFilesValidationError } from '../../exceptions/upload-files.validation.error';
import { StorageDomainError } from '@modules/transversal/domain/errors/storage.error';
import type { UploadFilesIdempotencyPort } from '@modules/transversal/domain/ports/storage/upload-files-idempotency.port';
import { UPLOAD_FILES_IDEMPOTENCY_PORT } from '@modules/transversal/transversal.tokens';

export type IngestUploadFilesSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

@Injectable()
export class IngestUploadFilesSqsMessageUseCase
  implements UseCase<IngestUploadFilesSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestUploadFilesSqsMessageUseCase.name);

  constructor(
    private readonly upload_files: UploadFilesUseCase,
    private readonly publish_files_uploaded: PublishFilesUploadedEventUseCase,
    @Inject(UPLOAD_FILES_IDEMPOTENCY_PORT)
    private readonly idempotency: UploadFilesIdempotencyPort,
  ) {}

  async execute(command: IngestUploadFilesSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(command.body) as unknown;
    } catch {
      this.logger.warn(
        '[UploadFiles][correlationId=unknown][step=parse] cuerpo no es JSON válido; reintento SQS.',
      );
      return command.delete_on_validation_error;
    }

    const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';
    this.logger.log(
      `[UploadFiles][correlationId=${correlation_for_log}][step=sqs_payload_received]`,
    );

    const dto = plainToInstance(UploadFilesInboundEventDto, parsed as object, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto as object, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      this.logger.warn(
        `[UploadFiles][correlationId=${correlation_for_log}][step=validation] ${message}`,
      );
      return command.delete_on_validation_error;
    }

    const begin = await this.idempotency.begin(dto.idempotency_key, dto.correlation_id);
    if (begin.status === 'duplicate') {
      this.logger.log(
        `[UploadFiles][correlationId=${dto.correlation_id}][step=idempotent_hit]`,
      );
      return true;
    }
    if (begin.status === 'conflict') {
      this.logger.warn(
        `[UploadFiles][correlationId=${dto.correlation_id}][step=idempotency_conflict]`,
      );
      return false;
    }

    try {
      const uploaded = await this.upload_files.execute({
        correlation_id: dto.correlation_id,
        idempotency_key: dto.idempotency_key,
        bucket: dto.payload.bucket,
        files: dto.payload.files.map((f) => ({
          raw_file: f.file,
          folder: f.folder,
        })),
      });

      await this.idempotency.complete(dto.idempotency_key, { files: uploaded });
      await this.publish_files_uploaded.execute({
        correlation_id: dto.correlation_id,
        files: uploaded,
      });

      this.logger.log(
        `[UploadFiles][correlationId=${dto.correlation_id}][step=outbound_published]`,
      );
      return true;
    } catch (err: unknown) {
      await this.idempotency.release(dto.idempotency_key);

      if (err instanceof UploadFilesValidationError) {
        this.logger.warn(
          `[UploadFiles][correlationId=${dto.correlation_id}][step=rejected] code=${err.code}`,
        );
        return command.delete_on_validation_error;
      }
      if (err instanceof StorageDomainError) {
        this.logger.error(
          `[UploadFiles][correlationId=${dto.correlation_id}][step=storage_error] code=${err.code}`,
        );
        return false;
      }
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `[UploadFiles][correlationId=${dto.correlation_id}][step=failed] ${text}`,
      );
      return false;
    }
  }

  private try_correlation_id(parsed: unknown): string | undefined {
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'correlationId' in parsed &&
      typeof (parsed as { correlationId: unknown }).correlationId === 'string'
    ) {
      return (parsed as { correlationId: string }).correlationId;
    }
    return undefined;
  }
}
