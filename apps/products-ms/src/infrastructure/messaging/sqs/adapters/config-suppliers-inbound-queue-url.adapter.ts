import { Inject, Injectable } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import type { SuppliersInboundQueueUrlPort } from '@messaging/domain/ports/suppliers-inbound-queue-url.port';

@Injectable()
export class ConfigSuppliersInboundQueueUrlAdapter implements SuppliersInboundQueueUrlPort {
  constructor(@Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig) {}

  get_suppliers_inbound_queue_url(): string | undefined {
    return this.queues_config.suppliers_inbound_queue_url;
  }
}
