import { Module } from '@nestjs/common';
import { CreateCreditFacilityUseCase } from '@modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case';
import { GetCreditFacilityByExternalIdUseCase } from '@modules/credit-facilities/application/use-cases/get-credit-facility-by-external-id/get-credit-facility-by-external-id.use-case';
import { ListCreditFacilitiesUseCase } from '@modules/credit-facilities/application/use-cases/list-credit-facilities/list-credit-facilities.use-case';
import { UpdateCreditFacilityByExternalIdUseCase } from '@modules/credit-facilities/application/use-cases/update-credit-facility-by-external-id/update-credit-facility-by-external-id.use-case';
import { DeleteCreditFacilityByExternalIdUseCase } from '@modules/credit-facilities/application/use-cases/delete-credit-facility-by-external-id/delete-credit-facility-by-external-id.use-case';

@Module({
  providers: [
    CreateCreditFacilityUseCase,
    GetCreditFacilityByExternalIdUseCase,
    ListCreditFacilitiesUseCase,
    UpdateCreditFacilityByExternalIdUseCase,
    DeleteCreditFacilityByExternalIdUseCase,
  ],
  exports: [
    CreateCreditFacilityUseCase,
    GetCreditFacilityByExternalIdUseCase,
    ListCreditFacilitiesUseCase,
    UpdateCreditFacilityByExternalIdUseCase,
    DeleteCreditFacilityByExternalIdUseCase,
  ],
})
export class CreditFacilitiesApplicationModule {}
