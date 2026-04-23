import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { DeleteCreditFacilityByExternalIdRequest } from './delete-credit-facility-by-external-id.request';

@Injectable()
export class DeleteCreditFacilityByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
  ) {}

  async execute(req: DeleteCreditFacilityByExternalIdRequest): Promise<void> {
    const ok = await this.credit_facility_repository.delete_by_external_id(
      req.external_id,
    );
    if (!ok) {
      throw new NotFoundException('credit facility not found');
    }
  }
}
