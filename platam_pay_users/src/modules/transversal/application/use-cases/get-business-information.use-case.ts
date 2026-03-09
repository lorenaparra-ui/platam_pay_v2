import { Inject, Injectable } from '@nestjs/common';
import type { BusinessInformationApiPort } from '../../domain/ports/business-information-api.port';
import { BUSINESS_INFORMATION_API } from '../../domain/ports/business-information-api.port';
import { BusinessInformationResponseDto } from '../dto/business-information-response.dto';

@Injectable()
export class GetBusinessInformationUseCase {
  constructor(
    @Inject(BUSINESS_INFORMATION_API)
    private readonly api: BusinessInformationApiPort,
  ) {}

  async execute(tax_id: string): Promise<BusinessInformationResponseDto | null> {
    const model = await this.api.getByTaxId(tax_id);
    return model ? BusinessInformationResponseDto.fromDomain(model) : null;
  }
}
