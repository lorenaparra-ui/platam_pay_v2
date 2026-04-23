import { Inject, Injectable } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { build_credit_facility_public_fields } from '@modules/credit-facilities/application/mapping/credit-facility-public-fields.builder';
import { ListCreditFacilitiesItemResponse } from './list-credit-facilities.response';

@Injectable()
export class ListCreditFacilitiesUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
  ) {}

  async execute(): Promise<ListCreditFacilitiesItemResponse[]> {
    const rows = await this.credit_facility_repository.find_all();
    return rows.map(
      (r) =>
        new ListCreditFacilitiesItemResponse(
          build_credit_facility_public_fields(r),
        ),
    );
  }
}
