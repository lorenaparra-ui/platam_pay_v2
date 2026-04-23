import { Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { build_partner_public_fields } from '@modules/partners/application/mapping/partner-public-fields.builder';
import { ListPartnersItemResponse } from './list-partners.response';

@Injectable()
export class ListPartnersUseCase {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private readonly partner_repository: PartnerRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(): Promise<ListPartnersItemResponse[]> {
    const rows = await this.partner_repository.find_all();
    const out: ListPartnersItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_partner_public_fields(row, this.lookup);
      out.push(new ListPartnersItemResponse(fields));
    }
    return out;
  }
}
