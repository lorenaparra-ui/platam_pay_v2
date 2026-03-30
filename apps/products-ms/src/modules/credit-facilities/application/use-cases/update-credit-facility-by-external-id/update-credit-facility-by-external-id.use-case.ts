import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import {
  CREDIT_FACILITY_STATUS_LOOKUP,
  CreditFacilityStatusLookupPort,
} from '@modules/credit-facilities/domain/ports/credit-facility-status-lookup.port';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { UpdateCreditFacilityProps } from '@modules/credit-facilities/domain/models/credit-facility.models';
import { build_credit_facility_public_fields } from '@modules/credit-facilities/application/mapping/credit-facility-public-fields.builder';
import { UpdateCreditFacilityByExternalIdRequest } from './update-credit-facility-by-external-id.request';
import { UpdateCreditFacilityByExternalIdResponse } from './update-credit-facility-by-external-id.response';

@Injectable()
export class UpdateCreditFacilityByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
    @Inject(CREDIT_FACILITY_STATUS_LOOKUP)
    private readonly status_lookup: CreditFacilityStatusLookupPort,
  ) {}

  async execute(
    req: UpdateCreditFacilityByExternalIdRequest,
  ): Promise<UpdateCreditFacilityByExternalIdResponse> {
    const patch: UpdateCreditFacilityProps = {};

    if (req.contract_id !== undefined) {
      patch.contract_id = req.contract_id;
    }
    if (req.total_limit !== undefined) {
      patch.total_limit = req.total_limit;
    }
    if (req.status_external_id !== undefined) {
      const status_id =
        await this.status_lookup.get_status_internal_id_by_external_id(
          req.status_external_id,
        );
      if (status_id === null) {
        throw new NotFoundException('status not found');
      }
      patch.status_id = status_id;
    }

    const updated = await this.credit_facility_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('credit facility not found');
    }

    const fields = await build_credit_facility_public_fields(
      updated,
      this.status_lookup,
    );
    return new UpdateCreditFacilityByExternalIdResponse(fields);
  }
}
