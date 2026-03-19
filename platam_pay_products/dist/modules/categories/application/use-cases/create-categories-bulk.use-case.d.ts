import type { CategoryRepositoryPort } from "../../domain/ports/category.repository.port";
import { type CategoryLineInput } from "../../domain/ports/category.repository.port";
import type { Category } from "../../domain/models/category.model";
export interface CreateCategoriesBulkPayload {
    credit_facility_id: number;
    categories: CategoryLineInput[];
}
export declare class CreateCategoriesBulkUseCase {
    private readonly repository;
    constructor(repository: CategoryRepositoryPort);
    run(payload: CreateCategoriesBulkPayload): Promise<Category[]>;
}
