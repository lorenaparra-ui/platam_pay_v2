import { Inject, Injectable } from '@nestjs/common';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT,
  type ProductsCreateCategoriesQueueUrlPort,
} from '@messaging/domain/ports/products-create-categories-queue-url.port';
import { ValidationFailedError } from '../exceptions/validation-failed.error';

export type CategoryItem = Readonly<{
  name: string;
  discount_percentage: string;
  interest_rate: string;
  disbursement_fee_percent: string | null;
  minimum_disbursement_fee: string | null;
  delay_days: number;
  term_days: number;
}>;

export type PublishCreateCategoriesCommandInput = Readonly<{
  correlation_id: string;
  credit_facility_id: number;
  partner_id: number;
  categories: readonly CategoryItem[];
}>;

@Injectable()
export class PublishCreateCategoriesCommandUseCase {
  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly message_publisher: OutboundMessagePublisherPort,
    @Inject(PRODUCTS_CREATE_CATEGORIES_QUEUE_URL_PORT)
    private readonly queue_url_port: ProductsCreateCategoriesQueueUrlPort,
  ) {}

  async execute(command: PublishCreateCategoriesCommandInput): Promise<void> {
    const queue_url = this.queue_url_port.get_create_categories_queue_url();
    if (queue_url === undefined || queue_url.trim().length === 0) {
      throw new ValidationFailedError(
        'Cola PRODUCTS_SQS_CREATE_CATEGORIES_QUEUE_URL no configurada',
      );
    }

    const body = JSON.stringify({
      event: 'create-categories-batch',
      version: '1.0',
      correlationId: command.correlation_id,
      payload: {
        credit_facility_id: command.credit_facility_id,
        partner_id: command.partner_id,
        categories: command.categories,
      },
    });

    await this.message_publisher.publish({ queue_url, body });
  }
}
