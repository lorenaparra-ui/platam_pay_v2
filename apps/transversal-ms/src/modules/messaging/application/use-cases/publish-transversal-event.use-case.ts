import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
  type TransversalOutboundQueueUrlPort,
} from '@messaging/domain/ports/transversal-outbound-queue-url.port';
import { TransversalOutboundEventDto } from '../dto/transversal-outbound-event.dto';
import { ValidationFailedError } from '../exceptions/validation-failed.error';

@Injectable()
export class PublishTransversalEventUseCase {
  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly message_publisher: OutboundMessagePublisherPort,
    @Inject(TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT)
    private readonly outbound_queue_url: TransversalOutboundQueueUrlPort,
  ) {}

  async execute(raw: unknown): Promise<void> {
    const dto = plainToInstance(TransversalOutboundEventDto, raw, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      throw new ValidationFailedError(`Evento transversal inválido: ${message}`);
    }

    const queue_url = this.outbound_queue_url.get_outbound_queue_url();
    const body = JSON.stringify({
      correlation_id: dto.correlation_id,
      event_type: dto.event_type,
      payload: dto.payload,
      trace_id: dto.trace_id,
    });

    await this.message_publisher.publish({ queue_url, body });
  }
}
