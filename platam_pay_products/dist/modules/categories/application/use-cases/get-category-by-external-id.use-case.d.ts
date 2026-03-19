import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";
export declare class GetCategoryByExternalIdUseCase {
    private readonly repository;
    constructor(repository: CategoryRepositoryPort);
    run(external_id: string): Promise<Category | null>;
}
