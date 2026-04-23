import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { UseCase } from '@platam/shared';
import { FilesUploadedInboundDto } from '../dto/files-uploaded-inbound.dto';
import { TransversalInboundMessageDto } from '../dto/transversal-inbound-message.dto';
import { ProcessTransversalInboundMessageUseCase } from './process-transversal-inbound-message.use-case';
import { ProcessFilesUploadedInboundUseCase } from './process-files-uploaded-inbound.use-case';

export type IngestTransversalInboundSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

function is_files_uploaded_event(
  v: unknown,
): v is Record<string, unknown> & { event: unknown } {
  return (
    typeof v === 'object' &&
    v !== null &&
    'event' in v &&
    (v as { event: unknown }).event === 'files-uploaded'
  );
}

/**
 * Parseo/validación del cuerpo SQS y delegación al caso de uso de dominio.
 */
@Injectable()
export class IngestTransversalInboundSqsMessageUseCase
  implements UseCase<IngestTransversalInboundSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestTransversalInboundSqsMessageUseCase.name);

  constructor(
    private readonly process_transversal_inbound_message: ProcessTransversalInboundMessageUseCase,
    private readonly process_files_uploaded_inbound: ProcessFilesUploadedInboundUseCase,
  ) {}

  /**
   * @returns `true` si el mensaje debe eliminarse de la cola.
   */
  async execute(command: IngestTransversalInboundSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(command.body) as unknown;
    } catch {
      this.logger.warn('Cuerpo de mensaje no es JSON válido; se dejará para reintento.');
      return command.delete_on_validation_error;
    }

    if (is_files_uploaded_event(parsed)) {
      const files_dto = plainToInstance(FilesUploadedInboundDto, parsed as object, {
        enableImplicitConversion: true,
      });
      const files_errors = validateSync(files_dto as object, { forbidUnknownValues: false });
      if (files_errors.length > 0) {
        const message = files_errors
          .map((e) => Object.values(e.constraints ?? {}).join(', '))
          .join('; ');
        this.logger.warn(
          JSON.stringify({ msg: 'files_uploaded_dto_invalid', detail: message }),
        );
        return command.delete_on_validation_error;
      }
      try {
        await this.process_files_uploaded_inbound.execute(files_dto);
        return true;
      } catch (err: unknown) {
        const text = err instanceof Error ? err.message : String(err);
        this.logger.error(
          JSON.stringify({ msg: 'files_uploaded_process_failed', error: text }),
        );
        return false;
      }
    }

    const dto = plainToInstance(TransversalInboundMessageDto, parsed as object, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto as object, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      this.logger.warn(`DTO entrante inválido: ${message}`);
      return command.delete_on_validation_error;
    }

    try {
      await this.process_transversal_inbound_message.execute(dto);
      return true;
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error al procesar mensaje: ${text}`);
      return false;
    }
  }
}
