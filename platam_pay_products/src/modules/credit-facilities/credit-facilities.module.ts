import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreditFacilityEntity } from "@libs/database";
import { CategoriesModule } from "../categories/categories.module";
import { TypeOrmCreditFacilityRepository } from "@infrastructure/database/repositories/typeorm-credit-facility.repository";
import { CREDIT_FACILITY_REPOSITORY } from "./domain/ports/credit-facility.repository.port";
import { CreateCreditFacilityUseCase } from "./application/use-cases/create-credit-facility.use-case";
import { CreateCreditFacilityWithCategoriesUseCase } from "./application/use-cases/create-credit-facility-with-categories.use-case";

/**
 * Depende de {@link CategoriesModule} para crear categorías asociadas (sin dependencia inversa).
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([CreditFacilityEntity]),
    CategoriesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: CREDIT_FACILITY_REPOSITORY,
      useClass: TypeOrmCreditFacilityRepository,
    },
    CreateCreditFacilityUseCase,
    CreateCreditFacilityWithCategoriesUseCase,
  ],
  exports: [
    CREDIT_FACILITY_REPOSITORY,
    CreateCreditFacilityUseCase,
    CreateCreditFacilityWithCategoriesUseCase,
  ],
})
export class CreditFacilitiesModule {}
