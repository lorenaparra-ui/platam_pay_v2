import { Inject, Injectable } from '@nestjs/common';
import { Guarantor } from '../../../domain/models/guarantor.model';
import type { CreateGuarantorPayload } from '../../../domain/ports/guarantor.repository.port';
import {
  GUARANTOR_REPOSITORY,
  type GuarantorRepositoryPort,
} from '../../../domain/ports/guarantor.repository.port';
import type { CreateGuarantorRequestDto } from '../../dto/create-guarantor-request.dto';

@Injectable()
export class CreateGuarantorUseCase {
  constructor(
    @Inject(GUARANTOR_REPOSITORY)
    private readonly repository: GuarantorRepositoryPort,
  ) {}

  async execute(dto: CreateGuarantorRequestDto): Promise<Guarantor> {
    const payload: CreateGuarantorPayload = {
      creditApplicationId: dto.creditApplicationId,
      personId: dto.personId,
      contractSignerId: dto.contractSignerId ?? null,
      guarantorType: dto.guarantorType,
      relationshipToApplicant: dto.relationshipToApplicant ?? null,
      isPrimaryGuarantor: dto.isPrimaryGuarantor ?? false,
      selectedAfterCreditCheck: dto.selectedAfterCreditCheck ?? false,
      signatureUrl: dto.signatureUrl ?? null,
      signatureDate: dto.signatureDate ? new Date(dto.signatureDate) : null,
    };
    return this.repository.create(payload);
  }
}
