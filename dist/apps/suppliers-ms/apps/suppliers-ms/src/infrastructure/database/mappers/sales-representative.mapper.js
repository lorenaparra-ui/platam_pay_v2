"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentativeMapper = void 0;
const sales_representative_entity_1 = require("../../../modules/sales-representatives/domain/entities/sales-representative.entity");
class SalesRepresentativeMapper {
    static to_domain(row) {
        return new sales_representative_entity_1.SalesRepresentative(Number(row.id), row.externalId, Number(row.partnerId), row.userId === null || row.userId === undefined ? null : Number(row.userId), row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        const user_raw = row['user_id'];
        return new sales_representative_entity_1.SalesRepresentative(Number(row['id']), String(row['external_id']), Number(row['partner_id']), user_raw === null || user_raw === undefined ? null : Number(user_raw), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.SalesRepresentativeMapper = SalesRepresentativeMapper;
//# sourceMappingURL=sales-representative.mapper.js.map