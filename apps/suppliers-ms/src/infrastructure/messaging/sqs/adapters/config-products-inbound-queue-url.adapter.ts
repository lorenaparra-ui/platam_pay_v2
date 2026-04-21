import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ProductsInboundQueueUrlPort } from '@messaging/domain/ports/products-inbound-queue-url.port';

@Injectable()
export class ConfigProductsInboundQueueUrlAdapter implements ProductsInboundQueueUrlPort {
  constructor(private readonly config_service: ConfigService) {}

  get_products_inbound_queue_url(): string | undefined {
    return this.config_service.get<string>('sqs.products_inbound_queue_url');
  }
}
