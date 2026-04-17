import { type OutboundMessagePublisherPort } from '@messaging/domain/ports/outbound-message-publisher.port';
import { type ProductsOutboundQueueUrlPort } from '@messaging/domain/ports/products-outbound-queue-url.port';
export declare class PublishProductsEventUseCase {
    private readonly message_publisher;
    private readonly outbound_queue_url;
    constructor(message_publisher: OutboundMessagePublisherPort, outbound_queue_url: ProductsOutboundQueueUrlPort);
    execute(raw: unknown): Promise<void>;
}
