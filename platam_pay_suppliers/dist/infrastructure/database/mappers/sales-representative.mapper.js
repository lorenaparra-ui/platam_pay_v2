"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentativeMapper = void 0;
const sales_representative_model_1 = require("../../../modules/sales-representatives/domain/models/sales-representative.model");
const database_1 = require("@libs/database");
class SalesRepresentativeMapper {
    static toDomain(entity) {
        return new sales_representative_model_1.SalesRepresentative(Number(entity.id), entity.externalId, Number(entity.partnerId), entity.userId != null ? Number(entity.userId) : null, entity.name, entity.role, Number(entity.statusId), entity.createdAt, entity.updatedAt);
    }
    static toCreateEntity(payload) {
        const entity = new database_1.SalesRepresentativeEntity();
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