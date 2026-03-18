"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderMapper = void 0;
const database_1 = require("@libs/database");
class PurchaseOrderMapper {
    static toDomain(entity) {
        return {
            id: entity.id,
            externalId: entity.externalId,
            userId: entity.userId,
            supplierId: entity.supplierId,
            amount: entity.amount,
            documentUrl: entity.documentUrl,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toCreateEntity(payload) {
        const entity = new database_1.PurchaseOrderEntity();
        entity.userId = payload.userId;
        entity.supplierId = payload.supplierId;
        entity.amount = payload.amount;
        entity.documentUrl = payload.documentUrl ?? null;
        return entity;
    }
}
exports.PurchaseOrderMapper = PurchaseOrderMapper;
//# sourceMappingURL=purchase-order.mapper.js.map