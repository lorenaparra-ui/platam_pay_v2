import { Business } from '@businesses/domain/models/business.model';
import { CreateBusinessPayload, UpdateBusinessPayload } from '@businesses/domain/ports/business.repository.port';
import { BusinessEntity } from '@libs/database';
export declare class BusinessMapper {
    static toDomain(entity: BusinessEntity): Business;
    static toCreateEntity(payload: CreateBusinessPayload): BusinessEntity;
    static applyUpdate(entity: BusinessEntity, payload: UpdateBusinessPayload): BusinessEntity;
    private static applyMutableFields;
}
