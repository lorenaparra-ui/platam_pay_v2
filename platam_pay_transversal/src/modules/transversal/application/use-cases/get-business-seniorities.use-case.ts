import { Inject, Injectable } from '@nestjs/common';
import type { BusinessSeniorityRepositoryPort } from '../../domain/ports/repository/business-seniority.repository.port';
import { BUSINESS_SENIORITY_REPOSITORY } from '../../domain/ports/repository/business-seniority.repository.port';
import { BusinessSeniorityResponseDto } from '../dto/business-seniority-response.dto';

@Injectable()
export class GetBusinessSenioritiesUseCase {
  constructor(
    @Inject(BUSINESS_SENIORITY_REPOSITORY)
    private readonly repository: BusinessSeniorityRepositoryPort,
  ) {}

  async execute(): Promise<BusinessSeniorityResponseDto[]> {
    const models = await this.repository.findAll();
    return models.map(BusinessSeniorityResponseDto.fromDomain);
  }

  async executeById(id: number): Promise<BusinessSeniorityResponseDto | null> {
    const model = await this.repository.findById(id);
    return model ? BusinessSeniorityResponseDto.fromDomain(model) : null;
  }
}
