"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierMapper = void 0;
const supplier_entity_1 = require("../../../modules/suppliers/domain/entities/supplier.entity");
class SupplierMapper {
    static to_domain(row, bank_account_id) {
        return new supplier_entity_1.Supplier(row.id, row.externalId, row.businessId, bank_account_id, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new supplier_entity_1.Supplier(Number(row['id']), String(row['external_id']), Number(row['business_id']), row['bank_account_id'] === null || row['bank_account_id'] === undefined
            ? null
            : Number(row['bank_account_id']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.SupplierMapper = SupplierMapper;
//# sourceMappingURL=supplier.mapper.js.map