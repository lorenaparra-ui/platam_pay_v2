import { type OutboundMessagePublisherPort } from '@messaging/domain/ports/outbound-message-publisher.port';
import { type TransversalOutboundQueueUrlPort } from '@messaging/domain/ports/transversal-outbound-queue-url.port';
export declare class PublishTransversalEventUseCase {
    private readonly message_publisher;
    private readonly outbound_queue_url;
    constructor(message_publisher: OutboundMessagePublisherPort, outbound_queue_url: TransversalOutboundQueueUrlPort);
    execute(raw: unknown): Promise<void>;
}
