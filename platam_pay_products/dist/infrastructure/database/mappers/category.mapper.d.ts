import type { Category } from "../../../modules/credit-facilities/domain/models/category.model";
import { CategoryEntity } from "@libs/database";
export declare class CategoryMapper {
    static to_domain(entity: CategoryEntity): Category;
}
