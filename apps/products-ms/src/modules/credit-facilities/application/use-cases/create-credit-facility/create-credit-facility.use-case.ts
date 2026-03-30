import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import {
  CREDIT_FACILITY_STATUS_LOOKUP,
  CreditFacilityStatusLookupPort,
} from '@modules/credit-facilities/domain/ports/credit-facility-status-lookup.port';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { build_credit_facility_public_fields } from '@modules/credit-facilities/application/mapping/credit-facility-public-fields.builder';
import { CreateCreditFacilityRequest } from './create-credit-facility.request';
import { CreateCreditFacilityResponse } from './create-credit-facility.response';

@Injectable()
export class CreateCreditFacilityUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
    @Inject(CREDIT_FACILITY_STATUS_LOOKUP)
    private readonly status_lookup: CreditFacilityStatusLookupPort,
  ) {}

  async execute(
    req: CreateCreditFacilityRequest,
  ): Promise<CreateCreditFacilityResponse> {
    const status_id =
      await this.status_lookup.get_status_internal_id_by_external_id(
        req.status_external_id,
      );
    if (status_id === null) {
      throw new NotFoundException('status not found');
    }

    const created = await this.credit_facility_repository.create({
      external_id: req.external_id,
      contract_id: req.contract_id,
      status_id,
      total_limit: req.total_limit,
    });

    const fields = await build_credit_facility_public_fields(
      created,
      this.status_lookup,
    );
    return new CreateCreditFacilityResponse(fields);
  }
}
