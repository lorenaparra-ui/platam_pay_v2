import { Inject, Injectable } from '@nestjs/common';
import { BUSINESS_REPOSITORY } from '../../domain/ports/business.repository.port';
import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';

@Injectable()
export class ListBusinessesUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly repository: BusinessRepositoryPort,
  ) {}

  async execute(): Promise<BusinessResponseDto[]> {
    const list = await this.repository.findAll();
    return list.map(BusinessResponseDto.fromDomain);
  }
}
