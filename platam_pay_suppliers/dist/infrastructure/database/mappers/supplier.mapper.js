"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierMapper = void 0;
const supplier_entity_1 = require("../entities/supplier.entity");
class SupplierMapper {
    static toDomain(entity) {
        return {
            id: entity.id,
            externalId: entity.externalId,
            businessId: entity.businessId,
            bankAccount: entity.bankAccount,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toCreateEntity(payload) {
        const entity = new supplier_entity_1.SupplierEntity();
        entity.businessId = payload.businessId;
        entity.bankAccount = payload.bankAccount ?? null;
        return entity;
    }
}
exports.SupplierMapper = SupplierMapper;
//# sourceMappingURL=supplier.mapper.js.map