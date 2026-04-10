import { type OutboundMessagePublisherPort } from '@messaging/domain/ports/outbound-message-publisher.port';
import { type ProductsCreateCreditFacilityQueueUrlPort } from '@messaging/domain/ports/products-create-credit-facility-queue-url.port';
export type PublishCreateCreditFacilityCommandInput = Readonly<{
    correlation_id: string;
    external_id: string;
    contract_id: string | null;
    total_limit: string;
    state: string;
}>;
export declare class PublishCreateCreditFacilityCommandUseCase {
    private readonly message_publisher;
    private readonly queue_url_port;
    constructor(message_publisher: OutboundMessagePublisherPort, queue_url_port: ProductsCreateCreditFacilityQueueUrlPort);
    execute(command: PublishCreateCreditFacilityCommandInput): Promise<void>;
}
