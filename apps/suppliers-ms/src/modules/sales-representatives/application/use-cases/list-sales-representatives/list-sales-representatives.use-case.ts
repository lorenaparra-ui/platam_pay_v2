import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { SALES_REPRESENTATIVE_REPOSITORY } from '@modules/sales-representatives/sales-representatives.tokens';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { build_sales_representative_public_fields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';
import type { SalesRepresentativePublicFields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';
import { ListSalesRepresentativesRequest } from './list-sales-representatives.request';

@Injectable()
export class ListSalesRepresentativesUseCase {
  constructor(
    @Inject(SALES_REPRESENTATIVE_REPOSITORY)
    private readonly sales_representative_repository: SalesRepresentativeRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: ListSalesRepresentativesRequest,
  ): Promise<SalesRepresentativePublicFields[]> {
    let partner_id_filter: number | undefined;
    if (req.partner_external_id !== undefined) {
      const trimmed = req.partner_external_id.trim();
      if (trimmed.length === 0) {
        throw new BadRequestException('partner_external_id invalid');
      }
      const resolved = await this.lookup.get_partner_internal_id_by_external_id(trimmed);
      if (resolved === null) {
        throw new BadRequestException('partner not found');
      }
      partner_id_filter = resolved;
    }

    const rows = await this.sales_representative_repository.find_all(partner_id_filter);
    const out: SalesRepresentativePublicFields[] = [];
    for (const row of rows) {
      const fields = await build_sales_representative_public_fields(row, this.lookup);
      if (fields === null) {
        throw new InternalServerErrorException();
      }
      out.push(fields);
    }
    return out;
  }
}
