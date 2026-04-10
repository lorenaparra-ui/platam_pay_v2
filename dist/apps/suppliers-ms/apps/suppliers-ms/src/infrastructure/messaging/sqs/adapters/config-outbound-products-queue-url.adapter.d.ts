import { ConfigService } from '@nestjs/config';
import type { ProductsOutboundQueueUrlPort } from '@messaging/domain/ports/products-outbound-queue-url.port';
export declare class ConfigOutboundProductsQueueUrlAdapter implements ProductsOutboundQueueUrlPort {
    private readonly config_service;
    constructor(config_service: ConfigService);
    get_outbound_queue_url(): string;
}
