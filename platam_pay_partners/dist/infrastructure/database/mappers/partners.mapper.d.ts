import { Partner } from "@partners/domain/models/partner.model";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
export declare class PartnersMapper {
    static toDomain(entity: PartnersEntity): Partner;
    static toEntity(domain: Partner): PartnersEntity;
}
