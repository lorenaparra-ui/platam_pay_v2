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
import { CreateSalesRepresentativeRequest } from './create-sales-representative.request';
import { CreateSalesRepresentativeResponse } from './create-sales-representative.response';

@Injectable()
export class CreateSalesRepresentativeUseCase {
  constructor(
    @Inject(SALES_REPRESENTATIVE_REPOSITORY)
    private readonly sales_representative_repository: SalesRepresentativeRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(req: CreateSalesRepresentativeRequest): Promise<CreateSalesRepresentativeResponse> {
    const partner_id = await this.lookup.get_partner_internal_id_by_external_id(
      req.partner_external_id,
    );
    if (partner_id === null) {
      throw new BadRequestException('partner not found');
    }

    let user_id: number | null = null;
    if (req.user_external_id !== undefined && req.user_external_id !== null) {
      const trimmed = req.user_external_id.trim();
      if (trimmed.length === 0) {
        throw new BadRequestException('user_external_id invalid');
      }
      const resolved = await this.lookup.get_user_internal_id_by_external_id(trimmed);
      if (resolved === null) {
        throw new BadRequestException('user not found');
      }
      user_id = resolved;
    }

    const created = await this.sales_representative_repository.create({
      partner_id,
      user_id,
    });

    const reloaded = await this.sales_representative_repository.find_by_external_id(
      created.external_id,
    );
    if (reloaded === null) {
      throw new InternalServerErrorException();
    }

    const fields = await build_sales_representative_public_fields(reloaded, this.lookup);
    if (fields === null) {
      throw new InternalServerErrorException();
    }

    return new CreateSalesRepresentativeResponse(fields);
  }
}
