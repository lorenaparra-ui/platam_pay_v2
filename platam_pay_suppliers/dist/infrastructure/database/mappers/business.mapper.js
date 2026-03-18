"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessMapper = void 0;
const business_model_1 = require("../../../modules/businesses/domain/models/business.model");
const database_1 = require("@libs/database");
class BusinessMapper {
    static toDomain(entity) {
        return new business_model_1.Business({
            id: entity.id,
            externalId: entity.externalId,
            userId: entity.userId,
            cityId: entity.cityId,
            entityType: entity.entityType,
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
    static toCreateEntity(payload) {
        const entity = new database_1.BusinessEntity();
        return this.applyMutableFields(entity, payload);
    }
    static applyUpdate(entity, payload) {
        return this.applyMutableFields(entity, payload);
    }
    static applyMutableFields(entity, payload) {
        if (payload.userId !== undefined)
            entity.userId = payload.userId;
        if (payload.cityId !== undefined)
            entity.cityId = payload.cityId;
        if (payload.entityType !== undefined)
            entity.entityType = payload.entityType;
        if (payload.businessName !== undefined)
            entity.businessName = payload.businessName;
        if (payload.businessAddress !== undefined)
            entity.businessAddress = payload.businessAddress;
        if (payload.businessType !== undefined)
            entity.businessType = payload.businessType;
        if (payload.relationshipToBusiness !== undefined) {
            entity.relationshipToBusiness = payload.relationshipToBusiness;
        }
        if (payload.legalName !== undefined)
            entity.legalName = payload.legalName;
        if (payload.tradeName !== undefined)
            entity.tradeName = payload.tradeName;
        if (payload.taxId !== undefined)
            entity.taxId = payload.taxId;
        if (payload.yearOfEstablishment !== undefined) {
            entity.yearOfEstablishment = payload.yearOfEstablishment;
        }
        return entity;
    }
}
exports.BusinessMapper = BusinessMapper;
//# sourceMappingURL=business.mapper.js.map