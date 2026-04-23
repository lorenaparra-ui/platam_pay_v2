import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ProductsCreateCategoriesQueueUrlPort } from '@messaging/domain/ports/products-create-categories-queue-url.port';

@Injectable()
export class ConfigProductsCreateCategoriesQueueUrlAdapter
  implements ProductsCreateCategoriesQueueUrlPort
{
  constructor(private readonly config_service: ConfigService) {}

  get_create_categories_queue_url(): string | undefined {
    return this.config_service.get<string>('sqs.products_create_categories_queue_url');
  }
}
