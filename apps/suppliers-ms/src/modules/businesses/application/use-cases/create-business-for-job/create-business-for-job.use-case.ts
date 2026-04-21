import { Inject, Injectable, Logger } from '@nestjs/common';
import { new_uuid } from '@platam/shared';
import { TypeormBusinessRepository } from '@infrastructure/database/repositories/typeorm-business.repository';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  PRODUCTS_INBOUND_QUEUE_URL_PORT,
  type ProductsInboundQueueUrlPort,
} from '@messaging/domain/ports/products-inbound-queue-url.port';

export interface CreateBusinessForJobInput {
  job_id: string;
  person_internal_id: number;
  city_internal_id: number | null;
  entity_type: string;
  business_name: string | null;
  business_address: string | null;
  business_type: string | null;
  relationship_to_business: string | null;
  already_exists?: boolean;
  business_internal_id?: number;
}

@Injectable()
export class CreateBusinessForJobUseCase {
  private readonly logger = new Logger(CreateBusinessForJobUseCase.name);

  constructor(
    private readonly business_repo: TypeormBusinessRepository,
    @Inject(PRODUCTS_INBOUND_QUEUE_URL_PORT)
    private readonly products_queue: ProductsInboundQueueUrlPort,
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly publisher: OutboundMessagePublisherPort,
  ) {}

  async execute(input: CreateBusinessForJobInput): Promise<void> {
    if (input.already_exists === true && input.business_internal_id !== undefined) {
      await this.publish_callback(input.job_id, input.business_internal_id, null);
      return;
    }

    const business = await this.business_repo.create({
      person_id: input.person_internal_id,
      city_id: input.city_internal_id,
      entity_type: input.entity_type,
      business_name: input.business_name,
      business_address: input.business_address,
      business_type: input.business_type,
      relationship_to_business: input.relationship_to_business,
      legal_name: null,
      trade_name: null,
      tax_id: null,
      year_of_establishment: null,
    });

    this.logger.log(
      `[CreateBusinessForJob] negocio creado id=${business.internal_id} job_id=${input.job_id}`,
    );
    await this.publish_callback(input.job_id, business.internal_id, business.external_id);
  }

  private async publish_callback(
    job_id: string,
    business_internal_id: number,
    business_external_id: string | null,
  ): Promise<void> {
    const queue_url = this.products_queue.get_products_inbound_queue_url();
    if (!queue_url) {
      this.logger.warn(
        '[CreateBusinessForJob] PRODUCTS_SQS_INBOUND_QUEUE_URL no configurada; omitiendo callback.',
      );
      return;
    }
    const body = JSON.stringify({
      correlation_id: new_uuid(),
      event_type: 'credit_application_business_created',
      payload: {
        job_id,
        business_internal_id,
        business_external_id,
      },
    });
    await this.publisher.publish({ queue_url, body });
    this.logger.log(
      `[CreateBusinessForJob] callback publicado job_id=${job_id} business_id=${business_internal_id}`,
    );
  }
}
