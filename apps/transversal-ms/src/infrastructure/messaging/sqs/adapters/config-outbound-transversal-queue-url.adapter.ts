import { Inject, Injectable } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalOutboundQueueUrlPort } from '@messaging/domain/ports/transversal-outbound-queue-url.port';

@Injectable()
export class ConfigOutboundTransversalQueueUrlAdapter implements TransversalOutboundQueueUrlPort {
  constructor(@Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig) {}

  get_outbound_queue_url(): string {
    return this.queues_config.outbound_queue_url;
  }
}
