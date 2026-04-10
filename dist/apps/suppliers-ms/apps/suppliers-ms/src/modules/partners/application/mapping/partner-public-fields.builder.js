"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_partner_public_fields = build_partner_public_fields;
const common_1 = require("@nestjs/common");
async function build_partner_public_fields(partner, lookup) {
    const supplier_external_id = await lookup.get_supplier_external_id_by_internal_id(partner.supplier_id);
    if (supplier_external_id === null) {
        throw new common_1.InternalServerErrorException();
    }
    return {
        internal_id: partner.internal_id,
        external_id: partner.external_id,
        supplier_external_id,
        acronym: partner.acronym,
        logo_url: partner.logo_url,
        co_branding_logo_url: partner.co_branding_logo_url,
        primary_color: partner.primary_color,
        secondary_color: partner.secondary_color,
        light_color: partner.light_color,
        notification_email: partner.notification_email,
        webhook_url: partner.webhook_url,
        send_sales_rep_voucher: partner.send_sales_rep_voucher,
        disbursement_notification_email: partner.disbursement_notification_email,
        state: partner.state,
        created_at: partner.created_at,
        updated_at: partner.updated_at,
    };
}
//# sourceMappingURL=partner-public-fields.builder.js.map