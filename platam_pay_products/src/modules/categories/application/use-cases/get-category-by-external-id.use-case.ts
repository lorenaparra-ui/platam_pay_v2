import { Inject, Injectable } from "@nestjs/common";
import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import { CATEGORY_REPOSITORY } from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";

@Injectable()
export class GetCategoryByExternalIdUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepositoryPort,
  ) {}

  async run(external_id: string): Promise<Category | null> {
    return this.repository.find_by_external_id(external_id);
  }
}
