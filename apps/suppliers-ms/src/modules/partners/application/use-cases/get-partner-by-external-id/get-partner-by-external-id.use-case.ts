import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { build_partner_public_fields } from '@modules/partners/application/mapping/partner-public-fields.builder';
import { GetPartnerByExternalIdRequest } from './get-partner-by-external-id.request';
import { GetPartnerByExternalIdResponse } from './get-partner-by-external-id.response';

@Injectable()
export class GetPartnerByExternalIdUseCase {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private readonly partner_repository: PartnerRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: GetPartnerByExternalIdRequest,
  ): Promise<GetPartnerByExternalIdResponse> {
    const row = await this.partner_repository.find_by_external_id(req.external_id);
    if (row === null) {
      throw new NotFoundException('partner not found');
    }
    const fields = await build_partner_public_fields(row, this.lookup);
    return new GetPartnerByExternalIdResponse(fields);
  }
}
