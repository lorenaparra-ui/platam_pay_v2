import type { Business } from "../../../modules/businesses/domain/models/business.model";
import { BusinessEntity } from "../entities/business.entity";
export declare class BusinessMapper {
    static toDomain(entity: BusinessEntity): Business;
    static toEntity(domain: Business): BusinessEntity;
}
