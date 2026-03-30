import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ProductsOutboundQueueUrlPort } from '@messaging/domain/ports/products-outbound-queue-url.port';

@Injectable()
export class ConfigOutboundProductsQueueUrlAdapter
  implements ProductsOutboundQueueUrlPort
{
  constructor(private readonly config_service: ConfigService) {}

  get_outbound_queue_url(): string {
    return this.config_service.getOrThrow<string>('sqs.products_outbound_queue_url');
  }
}
