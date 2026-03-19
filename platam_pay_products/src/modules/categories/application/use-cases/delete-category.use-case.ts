import { Inject, Injectable } from "@nestjs/common";
import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import { CATEGORY_REPOSITORY } from "../../domain/ports/category.repository.port";

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepositoryPort,
  ) {}

  async run(external_id: string): Promise<boolean> {
    return this.repository.delete_by_external_id(external_id);
  }
}
