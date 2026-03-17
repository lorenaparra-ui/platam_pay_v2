import { Inject, Injectable } from '@nestjs/common';
import { Shareholder } from '../../../domain/models/shareholder.model';
import type { CreateShareholderPayload } from '../../../domain/ports/shareholder.repository.port';
import {
  SHAREHOLDER_REPOSITORY,
  type ShareholderRepositoryPort,
} from '../../../domain/ports/shareholder.repository.port';
import type { CreateShareholderRequestDto } from '../../dto/create-shareholder-request.dto';

@Injectable()
export class CreateShareholderUseCase {
  constructor(
    @Inject(SHAREHOLDER_REPOSITORY)
    private readonly repository: ShareholderRepositoryPort,
  ) {}

  async execute(dto: CreateShareholderRequestDto): Promise<Shareholder> {
    const payload: CreateShareholderPayload = {
      companyId: dto.companyId,
      personId: dto.personId,
      ownershipPercentage: dto.ownershipPercentage ?? null,
      evaluationOrder: dto.evaluationOrder ?? null,
      creditCheckRequired: dto.creditCheckRequired ?? false,
      creditCheckCompleted: dto.creditCheckCompleted ?? false,
      isLegalRepresentative: dto.isLegalRepresentative ?? false,
    };
    return this.repository.create(payload);
  }
}
