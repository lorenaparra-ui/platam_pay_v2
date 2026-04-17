import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { SALES_REPRESENTATIVE_REPOSITORY } from '@modules/sales-representatives/sales-representatives.tokens';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { build_sales_representative_public_fields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';
import { GetSalesRepresentativeByExternalIdRequest } from './get-sales-representative-by-external-id.request';
import { GetSalesRepresentativeByExternalIdResponse } from './get-sales-representative-by-external-id.response';

@Injectable()
export class GetSalesRepresentativeByExternalIdUseCase {
  constructor(
    @Inject(SALES_REPRESENTATIVE_REPOSITORY)
    private readonly sales_representative_repository: SalesRepresentativeRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: GetSalesRepresentativeByExternalIdRequest,
  ): Promise<GetSalesRepresentativeByExternalIdResponse> {
    const row = await this.sales_representative_repository.find_by_external_id(
      req.externalId,
    );
    if (row === null) {
      throw new NotFoundException('sales representative not found');
    }

    const fields = await build_sales_representative_public_fields(row, this.lookup);
    if (fields === null) {
      throw new InternalServerErrorException();
    }

    return new GetSalesRepresentativeByExternalIdResponse(fields);
  }
}
