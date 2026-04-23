import { Inject, Injectable } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalCreatePersonQueueUrlPort } from '@messaging/domain/ports/transversal-create-person-queue-url.port';

@Injectable()
export class ConfigTransversalCreatePersonQueueUrlAdapter
  implements TransversalCreatePersonQueueUrlPort
{
  constructor(@Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig) {}

  get_create_person_queue_url(): string | undefined {
    return this.queues_config.create_person_queue_url;
  }
}
