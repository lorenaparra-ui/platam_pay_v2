import { Inject, Injectable } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalCreatePartnerUserQueueUrlPort } from '@messaging/domain/ports/transversal-create-partner-user-queue-url.port';

@Injectable()
export class ConfigTransversalCreatePartnerUserQueueUrlAdapter
  implements TransversalCreatePartnerUserQueueUrlPort
{
  constructor(@Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig) {}

  get_create_partner_user_queue_url(): string | undefined {
    return this.queues_config.create_partner_user_queue_url;
  }
}
