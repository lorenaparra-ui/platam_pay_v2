"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_sales_representative_public_fields = build_sales_representative_public_fields;
async function build_sales_representative_public_fields(rep, lookup) {
    const partner_external_id = await lookup.get_partner_external_id_by_internal_id(rep.partner_id);
    if (partner_external_id === null) {
        return null;
    }
    const user_external_id = rep.user_id === null
        ? null
        : await lookup.get_user_external_id_by_internal_id(rep.user_id);
    return {
        internal_id: rep.internal_id,
        external_id: rep.external_id,
        partner_external_id,
        user_external_id,
        created_at: rep.created_at,
        updated_at: rep.updated_at,
    };
}
//# sourceMappingURL=sales-representative-public-fields.builder.js.map