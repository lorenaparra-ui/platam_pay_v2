import { Inject, Injectable } from '@nestjs/common';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT,
  type ProductsCreateCreditFacilityQueueUrlPort,
} from '@messaging/domain/ports/products-create-credit-facility-queue-url.port';
import { ValidationFailedError } from '../exceptions/validation-failed.error';

export type PublishCreateCreditFacilityCommandInput = Readonly<{
  correlation_id: string;
  external_id: string;
  contract_id: string | null;
  total_limit: string;
  state: string;
}>;

@Injectable()
export class PublishCreateCreditFacilityCommandUseCase {
  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly message_publisher: OutboundMessagePublisherPort,
    @Inject(PRODUCTS_CREATE_CREDIT_FACILITY_QUEUE_URL_PORT)
    private readonly queue_url_port: ProductsCreateCreditFacilityQueueUrlPort,
  ) {}

  async execute(command: PublishCreateCreditFacilityCommandInput): Promise<void> {
    const queue_url = this.queue_url_port.get_create_credit_facility_queue_url();
    if (queue_url === undefined || queue_url.trim().length === 0) {
      throw new ValidationFailedError(
        'Cola PRODUCTS_SQS_CREATE_CREDIT_FACILITY_QUEUE_URL no configurada',
      );
    }

    const body = JSON.stringify({
      event: 'create-credit-facility',
      version: '1.0',
      correlationId: command.correlation_id,
      payload: {
        external_id: command.external_id,
        contract_id: command.contract_id,
        total_limit: command.total_limit,
        state: command.state,
      },
    });

    await this.message_publisher.publish({ queue_url, body });
  }
}
