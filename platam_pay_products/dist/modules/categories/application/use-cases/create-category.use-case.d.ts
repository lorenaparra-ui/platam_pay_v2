import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import { type CategoryCreateInput } from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";
export declare class CreateCategoryUseCase {
    private readonly repository;
    constructor(repository: CategoryRepositoryPort);
    run(input: CategoryCreateInput): Promise<Category>;
}
