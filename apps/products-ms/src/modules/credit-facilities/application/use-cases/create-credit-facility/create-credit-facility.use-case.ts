import { Inject, Injectable } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { build_credit_facility_public_fields } from '@modules/credit-facilities/application/mapping/credit-facility-public-fields.builder';
import { CreateCreditFacilityRequest } from './create-credit-facility.request';
import { CreateCreditFacilityResponse } from './create-credit-facility.response';

@Injectable()
export class CreateCreditFacilityUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
  ) {}

  async execute(
    req: CreateCreditFacilityRequest,
  ): Promise<CreateCreditFacilityResponse> {
    const created = await this.credit_facility_repository.create({
      contract_id: req.contract_id,
      total_limit: req.total_limit,
      state: req.state,
      business_id: req.business_id,
      external_id: req.external_id,
    });

    const fields = build_credit_facility_public_fields(created);
    return new CreateCreditFacilityResponse(fields);
  }
}
