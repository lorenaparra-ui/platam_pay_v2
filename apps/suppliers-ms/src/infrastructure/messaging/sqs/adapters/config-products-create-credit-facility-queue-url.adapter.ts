import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ProductsCreateCreditFacilityQueueUrlPort } from '@messaging/domain/ports/products-create-credit-facility-queue-url.port';

@Injectable()
export class ConfigProductsCreateCreditFacilityQueueUrlAdapter
  implements ProductsCreateCreditFacilityQueueUrlPort
{
  constructor(private readonly config_service: ConfigService) {}

  get_create_credit_facility_queue_url(): string | undefined {
    return this.config_service.get<string>('sqs.products_create_credit_facility_queue_url');
  }
}
