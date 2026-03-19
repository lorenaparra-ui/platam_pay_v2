import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";
export declare class ListCategoriesByCreditFacilityIdUseCase {
    private readonly repository;
    constructor(repository: CategoryRepositoryPort);
    run(credit_facility_id: number): Promise<Category[]>;
}
