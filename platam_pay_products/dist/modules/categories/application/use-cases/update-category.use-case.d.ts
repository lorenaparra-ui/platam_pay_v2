import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import { type CategoryUpdateInput } from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";
export declare class UpdateCategoryUseCase {
    private readonly repository;
    constructor(repository: CategoryRepositoryPort);
    run(external_id: string, input: CategoryUpdateInput): Promise<Category | null>;
}
