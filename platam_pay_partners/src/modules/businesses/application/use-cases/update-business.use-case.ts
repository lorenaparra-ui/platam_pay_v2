import { Inject, Injectable } from '@nestjs/common';
import { BUSINESS_REPOSITORY } from '../../domain/ports/business.repository.port';
import type { BusinessRepositoryPort, UpdateBusinessPayload } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';
import { UpdateBusinessRequestDto } from '../dto/update-business-request.dto';

@Injectable()
export class UpdateBusinessUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly repository: BusinessRepositoryPort,
  ) {}

  async execute(
    externalId: string,
    dto: UpdateBusinessRequestDto,
  ): Promise<BusinessResponseDto | null> {
    const payload: UpdateBusinessPayload = {};
    if (dto.userId !== undefined) payload.userId = dto.userId;
    if (dto.cityId !== undefined) payload.cityId = dto.cityId;
    if (dto.entityType !== undefined) payload.entityType = dto.entityType;
    if (dto.businessName !== undefined) payload.businessName = dto.businessName;
    if (dto.businessAddress !== undefined) payload.businessAddress = dto.businessAddress;
    if (dto.businessType !== undefined) payload.businessType = dto.businessType;
    if (dto.relationshipToBusiness !== undefined) payload.relationshipToBusiness = dto.relationshipToBusiness;
    if (dto.legalName !== undefined) payload.legalName = dto.legalName;
    if (dto.tradeName !== undefined) payload.tradeName = dto.tradeName;
    if (dto.taxId !== undefined) payload.taxId = dto.taxId;
    if (dto.yearOfEstablishment !== undefined) payload.yearOfEstablishment = dto.yearOfEstablishment;

    const business = await this.repository.updateByExternalId(externalId, payload);
    return business ? BusinessResponseDto.fromDomain(business) : null;
  }
}
