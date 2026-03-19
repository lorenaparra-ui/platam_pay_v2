import { DataSource } from "typeorm";
import type { CategoryRepositoryPort, CategoryCreateInput, CategoryLineInput, CategoryUpdateInput } from "../../../modules/categories/domain/ports/category.repository.port";
import type { Category } from "../../../modules/categories/domain/models/category.model";
export declare class TypeOrmCategoryRepository implements CategoryRepositoryPort {
    private readonly data_source;
    constructor(data_source: DataSource);
    create(input: CategoryCreateInput): Promise<Category>;
    create_bulk(credit_facility_id: number, items: CategoryLineInput[]): Promise<Category[]>;
    find_by_external_id(external_id: string): Promise<Category | null>;
    find_by_credit_facility_id(credit_facility_id: number): Promise<Category[]>;
    update_by_external_id(external_id: string, input: CategoryUpdateInput): Promise<Category | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
