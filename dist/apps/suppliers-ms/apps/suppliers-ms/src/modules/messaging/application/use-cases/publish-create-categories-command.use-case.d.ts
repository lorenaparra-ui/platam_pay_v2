import { type OutboundMessagePublisherPort } from '@messaging/domain/ports/outbound-message-publisher.port';
import { type ProductsCreateCategoriesQueueUrlPort } from '@messaging/domain/ports/products-create-categories-queue-url.port';
export type CategoryItem = Readonly<{
    name: string;
    discount_percentage: string;
    interest_rate: string;
    disbursement_fee_percent: string | null;
    minimum_disbursement_fee: string | null;
    delay_days: number;
    term_days: number;
}>;
export type PublishCreateCategoriesCommandInput = Readonly<{
    correlation_id: string;
    credit_facility_external_id: string;
    partner_id: number;
    state: string;
    categories: readonly CategoryItem[];
}>;
export declare class PublishCreateCategoriesCommandUseCase {
    private readonly message_publisher;
    private readonly queue_url_port;
    constructor(message_publisher: OutboundMessagePublisherPort, queue_url_port: ProductsCreateCategoriesQueueUrlPort);
    execute(command: PublishCreateCategoriesCommandInput): Promise<void>;
}
