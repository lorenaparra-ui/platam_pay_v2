import { Inject, Injectable } from "@nestjs/common";
import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import { CATEGORY_REPOSITORY } from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";

@Injectable()
export class ListCategoriesByCreditFacilityIdUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepositoryPort,
  ) {}

  async run(credit_facility_id: number): Promise<Category[]> {
    return this.repository.find_by_credit_facility_id(credit_facility_id);
  }
}
