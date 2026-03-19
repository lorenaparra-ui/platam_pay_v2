import { Inject, Injectable } from "@nestjs/common";
import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import {
  CATEGORY_REPOSITORY,
  type CategoryCreateInput,
} from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepositoryPort,
  ) {}

  async run(input: CategoryCreateInput): Promise<Category> {
    return this.repository.create(input);
  }
}
