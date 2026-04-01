import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
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
    if (req.state !== undefined) {
      patch.state = req.state;
    }

    const updated = await this.credit_facility_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('credit facility not found');
    }

    const fields = build_credit_facility_public_fields(updated);
    return new UpdateCreditFacilityByExternalIdResponse(fields);
  }
}
