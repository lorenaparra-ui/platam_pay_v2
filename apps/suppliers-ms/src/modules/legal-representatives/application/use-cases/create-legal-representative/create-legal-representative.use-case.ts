import { Inject, Injectable } from '@nestjs/common';
import { LEGAL_REPRESENTATIVE_REPOSITORY } from '@modules/legal-representatives/legal-representatives.tokens';
import type { LegalRepresentativeRepository } from '@modules/legal-representatives/domain/repositories/legal-representative.repository';
import { CreateLegalRepresentativeRequest } from './create-legal-representative.request';
import { CreateLegalRepresentativeResponse } from './create-legal-representative.response';

@Injectable()
export class CreateLegalRepresentativeUseCase {
  constructor(
    @Inject(LEGAL_REPRESENTATIVE_REPOSITORY)
    private readonly legal_representatives: LegalRepresentativeRepository,
  ) {}

  async execute(
    req: CreateLegalRepresentativeRequest,
  ): Promise<CreateLegalRepresentativeResponse> {
    const created = await this.legal_representatives.create({
      business_id: req.business_internal_id,
      person_id: req.person_internal_id,
      is_primary: req.is_primary,
    });

    return new CreateLegalRepresentativeResponse(created.external_id);
  }
}
