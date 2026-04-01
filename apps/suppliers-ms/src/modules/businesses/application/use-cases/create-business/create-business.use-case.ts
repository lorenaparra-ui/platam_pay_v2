import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { BUSINESS_REPOSITORY } from '@modules/businesses/businesses.tokens';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { build_business_public_fields } from '@modules/businesses/application/mapping/business-public-fields.builder';
import { CreateBusinessRequest } from './create-business.request';
import { CreateBusinessResponse } from './create-business.response';

@Injectable()
export class CreateBusinessUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly business_repository: BusinessRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(req: CreateBusinessRequest): Promise<CreateBusinessResponse> {
    let city_id: number | null = null;
    if (req.city_external_id !== null) {
      const c_id = await this.lookup.get_city_internal_id_by_external_id(
        req.city_external_id,
      );
      if (c_id === null) {
        throw new NotFoundException('city not found');
      }
      city_id = c_id;
    }

    const created = await this.business_repository.create({
      person_id: req.person_internal_id,
      city_id,
      entity_type: req.entity_type,
      business_name: req.business_name,
      business_address: req.business_address,
      business_type: req.business_type,
      relationship_to_business: req.relationship_to_business,
      legal_name: req.legal_name,
      trade_name: req.trade_name,
      tax_id: req.tax_id,
      year_of_establishment: req.year_of_establishment,
    });

    const fields = await build_business_public_fields(created, this.lookup);
    return new CreateBusinessResponse(fields);
  }
}
