import { Inject, Injectable } from '@nestjs/common';
import { BUSINESS_REPOSITORY } from '../../domain/ports/business.repository.port';
import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';

@Injectable()
export class DeleteBusinessUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly repository: BusinessRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<boolean> {
    return this.repository.deleteByExternalId(externalId);
  }
}
