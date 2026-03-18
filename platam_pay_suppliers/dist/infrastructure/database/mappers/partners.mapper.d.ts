import { Partner } from "@partners/domain/models/partner.model";
import { PartnersEntity } from '@libs/database';
export declare class PartnersMapper {
    static toDomain(entity: PartnersEntity): Partner;
    static toEntity(domain: Partner): PartnersEntity;
}
