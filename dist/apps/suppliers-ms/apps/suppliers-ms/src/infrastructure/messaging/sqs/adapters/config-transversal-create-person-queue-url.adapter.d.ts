import { type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalCreatePersonQueueUrlPort } from '@messaging/domain/ports/transversal-create-person-queue-url.port';
export declare class ConfigTransversalCreatePersonQueueUrlAdapter implements TransversalCreatePersonQueueUrlPort {
    private readonly queues_config;
    constructor(queues_config: SqsQueuesUrlsConfig);
    get_create_person_queue_url(): string | undefined;
}
