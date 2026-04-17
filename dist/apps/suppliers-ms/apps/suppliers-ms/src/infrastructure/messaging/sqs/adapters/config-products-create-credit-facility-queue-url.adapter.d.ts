import { ConfigService } from '@nestjs/config';
import type { ProductsCreateCreditFacilityQueueUrlPort } from '@messaging/domain/ports/products-create-credit-facility-queue-url.port';
export declare class ConfigProductsCreateCreditFacilityQueueUrlAdapter implements ProductsCreateCreditFacilityQueueUrlPort {
    private readonly config_service;
    constructor(config_service: ConfigService);
    get_create_credit_facility_queue_url(): string | undefined;
}
