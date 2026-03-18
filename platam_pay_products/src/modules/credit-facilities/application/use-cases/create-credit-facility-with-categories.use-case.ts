import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { CreditFacilityRepositoryPort } from "../../domain/ports/credit-facility.repository.port";
import {
  CREDIT_FACILITY_REPOSITORY,
  type CreateCreditFacilityWithCategoriesInput,
} from "../../domain/ports/credit-facility.repository.port";
import type { CreditFacility } from "../../domain/models/credit-facility.model";

@Injectable()
export class CreateCreditFacilityWithCategoriesUseCase {
  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly repository: CreditFacilityRepositoryPort,
  ) {}

  async run(
    input: CreateCreditFacilityWithCategoriesInput,
  ): Promise<CreditFacility> {
    if (!input.categories?.length) {
      throw new BadRequestException(
        "Se requiere al menos una categoría por línea de crédito.",
      );
    }
    return this.repository.create_with_categories(input);
  }
}
