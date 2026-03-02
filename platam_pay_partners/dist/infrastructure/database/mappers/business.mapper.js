"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessMapper = void 0;
const business_entity_1 = require("../entities/business.entity");
class BusinessMapper {
    static toDomain(entity) {
        return {
            id: entity.id,
            externalId: entity.externalId,
            userId: Number(entity.userId),
            countryCode: entity.countryCode,
            cityId: entity.cityId != null ? Number(entity.cityId) : null,
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
        };
    }
    static toEntity(domain) {
        const entity = new business_entity_1.BusinessEntity();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.countryCode = domain.countryCode;
        entity.cityId = domain.cityId;
        entity.entityType = domain.entityType;
        entity.businessName = domain.businessName;
        entity.businessAddress = domain.businessAddress;
        entity.businessType = domain.businessType;
        entity.relationshipToBusiness = domain.relationshipToBusiness;
        entity.legalName = domain.legalName;
        entity.tradeName = domain.tradeName;
        entity.taxId = domain.taxId;
        entity.yearOfEstablishment = domain.yearOfEstablishment;
        return entity;
    }
}
exports.BusinessMapper = BusinessMapper;
//# sourceMappingURL=business.mapper.js.map