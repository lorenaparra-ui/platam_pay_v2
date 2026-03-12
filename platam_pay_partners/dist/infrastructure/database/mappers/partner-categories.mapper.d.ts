import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import { PartnerCategoriesEntity } from "@infrastructure/database/entities/partner-categories.entity";
export declare class PartnerCategoriesMapper {
    static toDomain(entity: PartnerCategoriesEntity): PartnerCategory;
}
