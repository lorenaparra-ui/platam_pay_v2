import { Inject, Injectable } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import {
  CREDIT_FACILITY_STATUS_LOOKUP,
  CreditFacilityStatusLookupPort,
} from '@modules/credit-facilities/domain/ports/credit-facility-status-lookup.port';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { build_credit_facility_public_fields } from '@modules/credit-facilities/application/mapping/credit-facility-public-fields.builder';
import { ListCreditFacilitiesItemResponse } from './list-credit-facilities.response';

@Injectable()
export class ListCreditFacilitiesUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
    @Inject(CREDIT_FACILITY_STATUS_LOOKUP)
    private readonly status_lookup: CreditFacilityStatusLookupPort,
  ) {}

  async execute(): Promise<ListCreditFacilitiesItemResponse[]> {
    const rows = await this.credit_facility_repository.find_all();
    const out: ListCreditFacilitiesItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_credit_facility_public_fields(
        row,
        this.status_lookup,
      );
      out.push(new ListCreditFacilitiesItemResponse(fields));
    }
    return out;
  }
}
