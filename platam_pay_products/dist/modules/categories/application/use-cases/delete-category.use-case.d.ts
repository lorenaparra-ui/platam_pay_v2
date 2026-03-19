import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
export declare class DeleteCategoryUseCase {
    private readonly repository;
    constructor(repository: CategoryRepositoryPort);
    run(external_id: string): Promise<boolean>;
}
