import { type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalCreatePartnerUserQueueUrlPort } from '@messaging/domain/ports/transversal-create-partner-user-queue-url.port';
export declare class ConfigTransversalCreatePartnerUserQueueUrlAdapter implements TransversalCreatePartnerUserQueueUrlPort {
    private readonly queues_config;
    constructor(queues_config: SqsQueuesUrlsConfig);
    get_create_partner_user_queue_url(): string | undefined;
}
