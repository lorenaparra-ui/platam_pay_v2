import { ConfigService } from '@nestjs/config';
import type { ProductsCreateCategoriesQueueUrlPort } from '@messaging/domain/ports/products-create-categories-queue-url.port';
export declare class ConfigProductsCreateCategoriesQueueUrlAdapter implements ProductsCreateCategoriesQueueUrlPort {
    private readonly config_service;
    constructor(config_service: ConfigService);
    get_create_categories_queue_url(): string | undefined;
}
