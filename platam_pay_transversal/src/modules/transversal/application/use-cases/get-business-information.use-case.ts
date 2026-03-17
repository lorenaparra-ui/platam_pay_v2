import { Inject, Injectable } from '@nestjs/common';
import type { BusinessInformationApiPort } from '@transversal/domain/ports/repository/business-information-api.port';
import { BUSINESS_INFORMATION_API } from '@transversal/domain/ports/repository/business-information-api.port';
import { BusinessInformationResponseDto } from '../dto/business-information-response.dto';

@Injectable()
export class GetBusinessInformationUseCase {
  constructor(
    @Inject(BUSINESS_INFORMATION_API)
    private readonly api: BusinessInformationApiPort,
  ) {}

  async execute(taxId: string): Promise<BusinessInformationResponseDto | null> {
    const model = await this.api.getByTaxId(taxId);
    return model ? BusinessInformationResponseDto.fromDomain(model) : null;
  }
}
