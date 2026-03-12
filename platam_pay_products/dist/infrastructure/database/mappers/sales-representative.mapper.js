"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentativeMapper = void 0;
const sales_representative_model_1 = require("src/modules/persons/domain/models/sales-representative.model");
const sales_representative_entity_1 = require("../entities/sales-representative.entity");
class SalesRepresentativeMapper {
    static toDomain(entity) {
        return new sales_representative_model_1.SalesRepresentative(Number(entity.id), entity.externalId, Number(entity.partnerId), entity.userId != null ? Number(entity.userId) : null, entity.name, entity.role, Number(entity.statusId), entity.createdAt, entity.updatedAt);
    }
    static toEntity(domain) {
        const entity = new sales_representative_entity_1.SalesRepresentativeEntity();
        entity.id = domain.id;
        entity.partnerId = domain.partnerId;
        entity.userId = domain.userId;
        entity.name = domain.name;
        entity.role = domain.role;
        entity.statusId = domain.statusId;
        return entity;
    }
    static toCreateEntity(payload) {
        const entity = new sales_representative_entity_1.SalesRepresentativeEntity();
        entity.partnerId = payload.partnerId;
        entity.userId = payload.userId ?? null;
        entity.name = payload.name;
        entity.role = payload.role;
        entity.statusId = payload.statusId;
        return entity;
    }
}
exports.SalesRepresentativeMapper = SalesRepresentativeMapper;
//# sourceMappingURL=sales-representative.mapper.js.map