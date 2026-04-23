import { Inject, Injectable } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import type { ProductsOutboundQueueUrlPort } from '@messaging/domain/ports/products-outbound-queue-url.port';

@Injectable()
export class ConfigOutboundProductsQueueUrlAdapter implements ProductsOutboundQueueUrlPort {
  constructor(@Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig) {}

  get_outbound_queue_url(): string {
    return this.queues_config.outbound_queue_url;
  }
}
