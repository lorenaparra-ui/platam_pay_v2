import { Inject, Injectable } from '@nestjs/common';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT,
  type TransversalCreatePersonQueueUrlPort,
} from '@messaging/domain/ports/transversal-create-person-queue-url.port';
import { ValidationFailedError } from '../exceptions/validation-failed.error';

export type PublishCreatePersonCommandInput = Readonly<{
  correlation_id: string;
  idempotency_key: string;
  country_code: string | null;
  first_name: string;
  last_name: string;
  doc_type: string;
  doc_number: string;
  phone: string | null;
  city_external_id: string | null;
}>;

/**
 * Publica evento 'create-person' (v1.0) hacia TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL.
 * Solo crea la Persona (sin Usuario asociado).
 */
@Injectable()
export class PublishCreatePersonCommandUseCase {
  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly message_publisher: OutboundMessagePublisherPort,
    @Inject(TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT)
    private readonly create_person_queue_url: TransversalCreatePersonQueueUrlPort,
  ) {}

  async execute(command: PublishCreatePersonCommandInput): Promise<void> {
    const queue_url = this.create_person_queue_url.get_create_person_queue_url();
    if (queue_url === undefined || queue_url.trim().length === 0) {
      throw new ValidationFailedError(
        'Cola TRANSVERSAL_SQS_CREATE_PERSON_QUEUE_URL no configurada para alta de persona',
      );
    }

    const body = JSON.stringify({
      event: 'create-person',
      version: '1.0',
      correlationId: command.correlation_id,
      idempotencyKey: command.idempotency_key,
      payload: {
        country_code: command.country_code,
        first_name: command.first_name,
        last_name: command.last_name,
        doc_type: command.doc_type,
        doc_number: command.doc_number,
        phone: command.phone,
        city_external_id: command.city_external_id,
      },
    });

    await this.message_publisher.publish({ queue_url, body });
  }
}
