import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { LEGAL_REPRESENTATIVE_REPOSITORY } from '@modules/legal-representatives/legal-representatives.tokens';
import type { LegalRepresentativeRepository } from '@modules/legal-representatives/domain/repositories/legal-representative.repository';
import { CreateLegalRepresentativeRequest } from './create-legal-representative.request';
import { CreateLegalRepresentativeResponse } from './create-legal-representative.response';

@Injectable()
export class CreateLegalRepresentativeUseCase {
  constructor(
    @Inject(LEGAL_REPRESENTATIVE_REPOSITORY)
    private readonly legal_representatives: LegalRepresentativeRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: CreateLegalRepresentativeRequest,
  ): Promise<CreateLegalRepresentativeResponse> {
    const person_id = await this.lookup.get_person_internal_id_by_external_id(
      req.person_external_id,
    );
    if (person_id === null) {
      throw new NotFoundException('person not found');
    }

    const created = await this.legal_representatives.create({
      person_id,
      is_primary: req.is_primary,
    });

    return new CreateLegalRepresentativeResponse(created.external_id);
  }
}
