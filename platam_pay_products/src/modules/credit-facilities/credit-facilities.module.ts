import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreditFacilityEntity, CategoryEntity } from "@libs/database";
import { TypeOrmCreditFacilityRepository } from "@infrastructure/database/repositories/typeorm-credit-facility.repository";
import { CREDIT_FACILITY_REPOSITORY } from "./domain/ports/credit-facility.repository.port";
import { CreateCreditFacilityWithCategoriesUseCase } from "./application/use-cases/create-credit-facility-with-categories.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([CreditFacilityEntity, CategoryEntity])],
  controllers: [],
  providers: [
    {
      provide: CREDIT_FACILITY_REPOSITORY,
      useClass: TypeOrmCreditFacilityRepository,
    },
    CreateCreditFacilityWithCategoriesUseCase,
  ],
  exports: [
    CREDIT_FACILITY_REPOSITORY,
    CreateCreditFacilityWithCategoriesUseCase,
  ],
})
export class CreditFacilitiesModule {}
