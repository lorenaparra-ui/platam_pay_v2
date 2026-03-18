import { Business } from '@businesses/domain/models/business.model';
import {
  CreateBusinessPayload,
  UpdateBusinessPayload,
} from '@businesses/domain/ports/business.repository.port';
import { BusinessEntity } from '@libs/database';

export class BusinessMapper {
  static toDomain(entity: BusinessEntity): Business {
    return new Business({
      id: entity.id,
      externalId: entity.externalId,
      userId: entity.userId,
      cityId: entity.cityId,
      entityType: entity.entityType as 'PN' | 'PJ',
      businessName: entity.businessName,
      businessAddress: entity.businessAddress,
      businessType: entity.businessType,
      relationshipToBusiness: entity.relationshipToBusiness,
      legalName: entity.legalName,
      tradeName: entity.tradeName,
      taxId: entity.taxId,
      yearOfEstablishment: entity.yearOfEstablishment,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toCreateEntity(payload: CreateBusinessPayload): BusinessEntity {
    const entity = new BusinessEntity();
    return this.applyMutableFields(entity, payload);
  }

  static applyUpdate(
    entity: BusinessEntity,
    payload: UpdateBusinessPayload,
  ): BusinessEntity {
    return this.applyMutableFields(entity, payload);
  }

  private static applyMutableFields(
    entity: BusinessEntity,
    payload: CreateBusinessPayload | UpdateBusinessPayload,
  ): BusinessEntity {
    if (payload.userId !== undefined) entity.userId = payload.userId;
    if (payload.cityId !== undefined) entity.cityId = payload.cityId;
    if (payload.entityType !== undefined) entity.entityType = payload.entityType;
    if (payload.businessName !== undefined) entity.businessName = payload.businessName;
    if (payload.businessAddress !== undefined) entity.businessAddress = payload.businessAddress;
    if (payload.businessType !== undefined) entity.businessType = payload.businessType;
    if (payload.relationshipToBusiness !== undefined) {
      entity.relationshipToBusiness = payload.relationshipToBusiness;
    }
    if (payload.legalName !== undefined) entity.legalName = payload.legalName;
    if (payload.tradeName !== undefined) entity.tradeName = payload.tradeName;
    if (payload.taxId !== undefined) entity.taxId = payload.taxId;
    if (payload.yearOfEstablishment !== undefined) {
      entity.yearOfEstablishment = payload.yearOfEstablishment;
    }
    return entity;
  }
}
