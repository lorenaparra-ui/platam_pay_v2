import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { BUSINESS_REPOSITORY } from '@modules/businesses/businesses.tokens';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { UpdateBusinessProps } from '@modules/businesses/domain/entities/business.entity';
import { build_business_public_fields } from '@modules/businesses/application/mapping/business-public-fields.builder';
import { UpdateBusinessByExternalIdRequest } from './update-business-by-external-id.request';
import { UpdateBusinessByExternalIdResponse } from './update-business-by-external-id.response';

@Injectable()
export class UpdateBusinessByExternalIdUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly business_repository: BusinessRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: UpdateBusinessByExternalIdRequest,
  ): Promise<UpdateBusinessByExternalIdResponse> {
    const patch: UpdateBusinessProps = {};

    if (req.person_external_id !== undefined) {
      const id = await this.lookup.get_person_internal_id_by_external_id(
        req.person_external_id,
      );
      if (id === null) {
        throw new NotFoundException('person not found');
      }
      patch.person_id = id;
    }

    if (req.city_external_id !== undefined) {
      if (req.city_external_id === null) {
        patch.city_id = null;
      } else {
        const id = await this.lookup.get_city_internal_id_by_external_id(
          req.city_external_id,
        );
        if (id === null) {
          throw new NotFoundException('city not found');
        }
        patch.city_id = id;
      }
    }

    if (req.entity_type !== undefined) {
      patch.entity_type = req.entity_type;
    }
    if (req.business_name !== undefined) {
      patch.business_name = req.business_name;
    }
    if (req.business_address !== undefined) {
      patch.business_address = req.business_address;
    }
    if (req.business_type !== undefined) {
      patch.business_type = req.business_type;
    }
    if (req.relationship_to_business !== undefined) {
      patch.relationship_to_business = req.relationship_to_business;
    }
    if (req.legal_name !== undefined) {
      patch.legal_name = req.legal_name;
    }
    if (req.trade_name !== undefined) {
      patch.trade_name = req.trade_name;
    }
    if (req.tax_id !== undefined) {
      patch.tax_id = req.tax_id;
    }
    if (req.year_of_establishment !== undefined) {
      patch.year_of_establishment = req.year_of_establishment;
    }

    const updated = await this.business_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('business not found');
    }

    const fields = await build_business_public_fields(updated, this.lookup);
    return new UpdateBusinessByExternalIdResponse(fields);
  }
}
