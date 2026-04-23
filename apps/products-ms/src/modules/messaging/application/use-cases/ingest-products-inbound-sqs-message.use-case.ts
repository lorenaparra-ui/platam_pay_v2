import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { UseCase } from '@platam/shared';
import { TransversalInboundMessageDto } from '../dto/transversal-inbound-message.dto';
import { ProcessProductsInboundMessageUseCase } from './process-products-inbound-message.use-case';

export type IngestProductsInboundSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

/**
 * Parseo/validación del cuerpo SQS y delegación al caso de uso de dominio.
 */
@Injectable()
export class IngestProductsInboundSqsMessageUseCase
  implements UseCase<IngestProductsInboundSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestProductsInboundSqsMessageUseCase.name);

  constructor(
    private readonly process_products_inbound_message: ProcessProductsInboundMessageUseCase,
  ) {}

  /**
   * @returns `true` si el mensaje debe eliminarse de la cola.
   */
  async execute(command: IngestProductsInboundSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(command.body) as unknown;
    } catch {
      this.logger.warn('Cuerpo de mensaje no es JSON válido; se dejará para reintento.');
      return command.delete_on_validation_error;
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
      await this.process_products_inbound_message.execute(dto);
      return true;
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error al procesar mensaje: ${text}`);
      return false;
    }
  }
}
