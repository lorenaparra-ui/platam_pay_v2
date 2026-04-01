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
      person_id: req.person_internal_id,
      is_primary: req.is_primary,
    });

    if (req.supplier_internal_id !== null) {
      await this.legal_representatives.link_to_supplier(
        created.internal_id,
        req.supplier_internal_id,
      );
    }

    return new CreateLegalRepresentativeResponse(created.external_id);
  }
}
