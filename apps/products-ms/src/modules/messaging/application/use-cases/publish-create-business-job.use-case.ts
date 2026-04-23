import { Inject, Injectable, Logger } from '@nestjs/common';
import { new_uuid } from '@platam/shared';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  SUPPLIERS_INBOUND_QUEUE_URL_PORT,
  type SuppliersInboundQueueUrlPort,
} from '@messaging/domain/ports/suppliers-inbound-queue-url.port';

export interface CreateBusinessJobData {
  city_internal_id: number | null;
  entity_type: string;
  business_name: string | null;
  business_address: string | null;
  business_type: string | null;
  relationship_to_business: string | null;
}

@Injectable()
export class PublishCreateBusinessJobUseCase {
  private readonly logger = new Logger(PublishCreateBusinessJobUseCase.name);

  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly publisher: OutboundMessagePublisherPort,
    @Inject(SUPPLIERS_INBOUND_QUEUE_URL_PORT)
    private readonly suppliers_queue: SuppliersInboundQueueUrlPort,
  ) {}

  async execute(
    job_external_id: string,
    person_internal_id: number,
    data: CreateBusinessJobData,
  ): Promise<void> {
    const queue_url = this.suppliers_queue.get_suppliers_inbound_queue_url();
    if (!queue_url) {
      this.logger.warn('SUPPLIERS_SQS_INBOUND_QUEUE_URL no configurada; omitiendo publicación.');
      return;
    }
    const body = JSON.stringify({
      correlation_id: new_uuid(),
      event_type: 'credit_application_business_requested',
      payload: {
        job_id: job_external_id,
        person_internal_id,
        city_internal_id: data.city_internal_id,
        entity_type: data.entity_type,
        business_name: data.business_name,
        business_address: data.business_address,
        business_type: data.business_type,
        relationship_to_business: data.relationship_to_business,
      },
    });
    await this.publisher.publish({ queue_url, body });
  }

  /** Cuando persona y negocio ya existen: salta creación, notifica directamente a products-ms. */
  async execute_already_resolved(
    job_external_id: string,
    person_internal_id: number,
    business_internal_id: number,
  ): Promise<void> {
    const queue_url = this.suppliers_queue.get_suppliers_inbound_queue_url();
    if (!queue_url) {
      return;
    }
    const body = JSON.stringify({
      correlation_id: new_uuid(),
      event_type: 'credit_application_business_requested',
      payload: {
        job_id: job_external_id,
        person_internal_id,
        business_internal_id,
        already_exists: true,
      },
    });
    await this.publisher.publish({ queue_url, body });
  }
}
