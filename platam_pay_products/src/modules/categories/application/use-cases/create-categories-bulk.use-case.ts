import { Inject, Injectable } from "@nestjs/common";
import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import {
  CATEGORY_REPOSITORY,
  type CategoryLineInput,
} from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";

export interface CreateCategoriesBulkPayload {
  credit_facility_id: number;
  categories: CategoryLineInput[];
}

@Injectable()
export class CreateCategoriesBulkUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: CategoryRepositoryPort,
  ) {}

  async run(payload: CreateCategoriesBulkPayload): Promise<Category[]> {
    return this.repository.create_bulk(
      payload.credit_facility_id,
      payload.categories,
    );
  }
}
