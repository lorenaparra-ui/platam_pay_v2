import type { Category } from "../../../modules/categories/domain/models/category.model";
import { CategoryEntity } from "@libs/database";
export declare class CategoryMapper {
    static to_domain(entity: CategoryEntity): Category;
}
