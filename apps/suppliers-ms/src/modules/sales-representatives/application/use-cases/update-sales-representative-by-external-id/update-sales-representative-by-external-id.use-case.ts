import {
  BadRequestException,
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
import { UpdateSalesRepresentativeUserByExternalIdRequest } from './update-sales-representative-by-external-id.request';
import { UpdateSalesRepresentativeByExternalIdResponse } from './update-sales-representative-by-external-id.response';

@Injectable()
export class UpdateSalesRepresentativeByExternalIdUseCase {
  constructor(
    @Inject(SALES_REPRESENTATIVE_REPOSITORY)
    private readonly sales_representative_repository: SalesRepresentativeRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: UpdateSalesRepresentativeUserByExternalIdRequest,
  ): Promise<UpdateSalesRepresentativeByExternalIdResponse> {
    if (req.userExternalId === undefined) {
      throw new BadRequestException('userExternalId required for patch');
    }

    let user_internal_id: number | null;
    if (req.userExternalId === null) {
      user_internal_id = null;
    } else {
      const trimmed = req.userExternalId.trim();
      if (trimmed.length === 0) {
        throw new BadRequestException('userExternalId invalid');
      }
      const resolved = await this.lookup.get_user_internal_id_by_external_id(trimmed);
      if (resolved === null) {
        throw new BadRequestException('user not found');
      }
      user_internal_id = resolved;
    }

    const updated = await this.sales_representative_repository.update_user_by_external_id(
      req.externalId,
      user_internal_id,
    );
    if (updated === null) {
      throw new NotFoundException('sales representative not found');
    }

    const fields = await build_sales_representative_public_fields(updated, this.lookup);
    if (fields === null) {
      throw new InternalServerErrorException();
    }

    return new UpdateSalesRepresentativeByExternalIdResponse(fields);
  }
}
