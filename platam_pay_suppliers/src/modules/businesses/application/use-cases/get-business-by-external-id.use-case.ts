import { Inject, Injectable } from '@nestjs/common';
import { BUSINESS_REPOSITORY } from '../../domain/ports/business.repository.port';
import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';

@Injectable()
export class GetBusinessByExternalIdUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly repository: BusinessRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<BusinessResponseDto | null> {
    const business = await this.repository.findByExternalId(externalId);
    return business ? BusinessResponseDto.fromDomain(business) : null;
  }
}
