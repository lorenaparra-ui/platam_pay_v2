import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { LegalRepresentative } from '../../../domain/models/legal-representative.model';
import type { CreateLegalRepresentativePayload } from '../../../domain/ports/legal-representative.repository.port';
import {
  LEGAL_REPRESENTATIVE_REPOSITORY,
  type LegalRepresentativeRepositoryPort,
} from '../../../domain/ports/legal-representative.repository.port';
import type { CreateLegalRepresentativeRequestDto } from '../../dto/create-legal-representative-request.dto';

@Injectable()
export class CreateLegalRepresentativeUseCase {
  constructor(
    @Inject(LEGAL_REPRESENTATIVE_REPOSITORY)
    private readonly repository: LegalRepresentativeRepositoryPort,
  ) {}

  async execute(dto: CreateLegalRepresentativeRequestDto): Promise<LegalRepresentative> {
    const existing = await this.repository.findByCompanyId(dto.companyId);
    const alreadyLinked = existing.some((lr) => lr.personId === dto.personId);
    if (alreadyLinked) {
      throw new ConflictException(
        'Ya existe un representante legal para esta empresa y persona',
      );
    }
    const payload: CreateLegalRepresentativePayload = {
      companyId: dto.companyId,
      personId: dto.personId,
      isPrimary: dto.isPrimary,
    };
    return this.repository.create(payload);
  }
}
