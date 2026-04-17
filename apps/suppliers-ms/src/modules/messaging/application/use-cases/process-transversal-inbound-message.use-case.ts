import { Injectable, Logger } from '@nestjs/common';
import type { UseCase } from '@platam/shared';
import { TransversalInboundMessageDto } from '../dto/transversal-inbound-message.dto';

@Injectable()
export class ProcessTransversalInboundMessageUseCase
  implements UseCase<TransversalInboundMessageDto, void>
{
  private readonly logger = new Logger(ProcessTransversalInboundMessageUseCase.name);

  /**
   * Punto de extensión para reglas de negocio por tipo de evento.
   */
  async execute(dto: TransversalInboundMessageDto): Promise<void> {
    this.logger.log(
      `Mensaje transversal recibido: event_type=${dto.eventType} correlation_id=${dto.correlationId}`,
    );
  }
}
