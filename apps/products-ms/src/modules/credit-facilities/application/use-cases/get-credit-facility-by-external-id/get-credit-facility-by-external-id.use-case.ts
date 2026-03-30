import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import {
  CREDIT_FACILITY_STATUS_LOOKUP,
  CreditFacilityStatusLookupPort,
} from '@modules/credit-facilities/domain/ports/credit-facility-status-lookup.port';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { build_credit_facility_public_fields } from '@modules/credit-facilities/application/mapping/credit-facility-public-fields.builder';
import { GetCreditFacilityByExternalIdRequest } from './get-credit-facility-by-external-id.request';
import { GetCreditFacilityByExternalIdResponse } from './get-credit-facility-by-external-id.response';

@Injectable()
export class GetCreditFacilityByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
    @Inject(CREDIT_FACILITY_STATUS_LOOKUP)
    private readonly status_lookup: CreditFacilityStatusLookupPort,
  ) {}

  async execute(
    req: GetCreditFacilityByExternalIdRequest,
  ): Promise<GetCreditFacilityByExternalIdResponse> {
    const row = await this.credit_facility_repository.find_by_external_id(
      req.external_id,
    );
    if (row === null) {
      throw new NotFoundException('credit facility not found');
    }
    const fields = await build_credit_facility_public_fields(
      row,
      this.status_lookup,
    );
    return new GetCreditFacilityByExternalIdResponse(fields);
  }
}
