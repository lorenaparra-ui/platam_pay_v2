import { type OutboundMessagePublisherPort } from '@messaging/domain/ports/outbound-message-publisher.port';
import { type TransversalCreatePersonQueueUrlPort } from '@messaging/domain/ports/transversal-create-person-queue-url.port';
export type PublishCreatePersonCommandInput = Readonly<{
    correlation_id: string;
    idempotency_key: string;
    country_code: string | null;
    first_name: string;
    last_name: string;
    doc_type: string;
    doc_number: string;
    phone: string | null;
    city_external_id: string | null;
}>;
export declare class PublishCreatePersonCommandUseCase {
    private readonly message_publisher;
    private readonly create_person_queue_url;
    constructor(message_publisher: OutboundMessagePublisherPort, create_person_queue_url: TransversalCreatePersonQueueUrlPort);
    execute(command: PublishCreatePersonCommandInput): Promise<void>;
}
