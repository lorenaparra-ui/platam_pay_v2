import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCreditFacilityUseCase } from "./create-credit-facility.use-case";
import { CreateCategoriesBulkUseCase } from "../../../categories/application/use-cases/create-categories-bulk.use-case";
import type { CreateCreditFacilityWithCategoriesInput } from "../dto/create-credit-facility-with-categories.dto";
import type { CreateCreditFacilityWithCategoriesResult } from "../models/create-credit-facility-with-categories.result";

/**
 * Orquesta creación de línea de crédito y categorías usando el módulo `categories`.
 * No es transaccional entre ambos pasos: si falla el bulk, puede quedar línea sin categorías.
 */
@Injectable()
export class CreateCreditFacilityWithCategoriesUseCase {
  constructor(
    private readonly create_facility: CreateCreditFacilityUseCase,
    private readonly create_categories_bulk: CreateCategoriesBulkUseCase,
  ) {}

  async run(
    input: CreateCreditFacilityWithCategoriesInput,
  ): Promise<CreateCreditFacilityWithCategoriesResult> {
    if (!input.categories?.length) {
      throw new BadRequestException(
        "Se requiere al menos una categoría por línea de crédito.",
      );
    }
    const facility = await this.create_facility.run({
      contract_id: input.contract_id,
      status_id: input.status_id,
      total_limit: input.total_limit,
    });
    const categories = await this.create_categories_bulk.run({
      credit_facility_id: facility.id,
      categories: input.categories,
    });
    return { facility, categories };
  }
}
