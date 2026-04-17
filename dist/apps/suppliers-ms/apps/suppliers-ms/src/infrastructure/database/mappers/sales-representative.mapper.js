"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentativeMapper = void 0;
const sales_representative_entity_1 = require("../../../modules/sales-representatives/domain/entities/sales-representative.entity");
class SalesRepresentativeMapper {
    static to_domain(row) {
        const user_id = row.userId === null || row.userId === undefined
            ? null
            : Number(row.userId);
        const loaded_user = SalesRepresentativeMapper.loaded_user_from_row(row);
        return new sales_representative_entity_1.SalesRepresentative(Number(row.id), row.externalId, Number(row.partnerId), user_id, row.createdAt, row.updatedAt, loaded_user);
    }
    static loaded_user_from_row(row) {
        const u = row.user;
        if (!u?.person || !u.role) {
            return undefined;
        }
        const from_person = `${u.person.firstName} ${u.person.lastName}`.trim();
        const display_name = from_person.length > 0 ? from_person : (u.email ?? '').trim();
        if (!display_name) {
            return undefined;
        }
        return {
            external_id: u.externalId,
            display_name,
            role_name: u.role.name,
            state: u.state,
        };
    }
    static from_raw_row(row) {
        const user_raw = row['user_id'];
        return new sales_representative_entity_1.SalesRepresentative(Number(row['id']), String(row['external_id']), Number(row['partner_id']), user_raw === null || user_raw === undefined ? null : Number(user_raw), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.SalesRepresentativeMapper = SalesRepresentativeMapper;
//# sourceMappingURL=sales-representative.mapper.js.map