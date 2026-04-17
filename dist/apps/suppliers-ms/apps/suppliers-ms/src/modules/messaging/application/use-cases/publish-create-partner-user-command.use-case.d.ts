import { type OutboundMessagePublisherPort } from '@messaging/domain/ports/outbound-message-publisher.port';
import { type TransversalCreatePartnerUserQueueUrlPort } from '@messaging/domain/ports/transversal-create-partner-user-queue-url.port';
export type PublishCreatePartnerUserCommandInput = Readonly<{
    correlation_id: string;
    idempotency_key: string;
    email: string;
    country_code: string | null;
    first_name: string;
    last_name: string;
    doc_type: string;
    doc_number: string;
    phone: string | null;
    city_external_id: string | null;
}>;
export declare class PublishCreatePartnerUserCommandUseCase {
    private readonly message_publisher;
    private readonly create_user_queue_url;
    constructor(message_publisher: OutboundMessagePublisherPort, create_user_queue_url: TransversalCreatePartnerUserQueueUrlPort);
    execute(command: PublishCreatePartnerUserCommandInput): Promise<void>;
}
