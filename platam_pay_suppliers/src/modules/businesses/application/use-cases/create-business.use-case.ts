import { Inject, Injectable } from '@nestjs/common';
import { BUSINESS_REPOSITORY } from '../../domain/ports/business.repository.port';
import type { BusinessRepositoryPort, CreateBusinessPayload } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';
import { CreateBusinessRequestDto } from '../dto/create-business-request.dto';

@Injectable()
export class CreateBusinessUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly repository: BusinessRepositoryPort,
  ) {}

  async execute(dto: CreateBusinessRequestDto): Promise<BusinessResponseDto> {
    const payload: CreateBusinessPayload = {
      userId: dto.userId,
      cityId: dto.cityId ?? null,
      entityType: dto.entityType,
      businessName: dto.businessName ?? null,
      businessAddress: dto.businessAddress ?? null,
      businessType: dto.businessType ?? null,
      relationshipToBusiness: dto.relationshipToBusiness ?? null,
      legalName: dto.legalName ?? null,
      tradeName: dto.tradeName ?? null,
      taxId: dto.taxId ?? null,
      yearOfEstablishment: dto.yearOfEstablishment ?? null,
    };
    const business = await this.repository.create(payload);
    return BusinessResponseDto.fromDomain(business);
  }
}
