import { type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalOutboundQueueUrlPort } from '@messaging/domain/ports/transversal-outbound-queue-url.port';
export declare class ConfigOutboundTransversalQueueUrlAdapter implements TransversalOutboundQueueUrlPort {
    private readonly queues_config;
    constructor(queues_config: SqsQueuesUrlsConfig);
    get_outbound_queue_url(): string;
}
