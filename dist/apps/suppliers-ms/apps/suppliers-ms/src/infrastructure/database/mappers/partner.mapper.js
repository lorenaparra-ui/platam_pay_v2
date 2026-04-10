"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerMapper = void 0;
const partner_entity_1 = require("../../../modules/partners/domain/entities/partner.entity");
const shared_1 = require("../../../../../../libs/shared/src");
class PartnerMapper {
    static to_domain(row) {
        return new partner_entity_1.Partner({
            internal_id: row.id,
            supplier_id: row.supplier.id,
            external_id: row.externalId,
            acronym: row.acronym ?? null,
            logo_url: row.logoUrl ?? null,
            co_branding_logo_url: row.coBrandingLogoUrl ?? null,
            primary_color: row.primaryColor ?? null,
            secondary_color: row.secondaryColor ?? null,
            light_color: row.lightColor ?? null,
            notification_email: row.notificationEmail ?? null,
            webhook_url: row.webhookUrl ?? null,
            send_sales_rep_voucher: row.sendSalesRepVoucher,
            disbursement_notification_email: row.disbursementNotificationEmail ?? null,
            state: row.state,
            created_at: row.createdAt,
            updated_at: row.updatedAt,
        });
    }
    static from_raw_row(row) {
        const state_raw = String(row['state'] ?? shared_1.Statuses.ACTIVE);
        const state = state_raw === shared_1.Statuses.INACTIVE ? shared_1.Statuses.INACTIVE : shared_1.Statuses.ACTIVE;
        return new partner_entity_1.Partner({
            internal_id: Number(row['id']),
            supplier_id: Number(row['supplier_id']),
            external_id: String(row['external_id']),
            acronym: row['acronym'] ?? null,
            logo_url: row['logo_url'] ?? null,
            co_branding_logo_url: row['co_branding_logo_url'] ?? null,
            primary_color: row['primary_color'] ?? null,
            secondary_color: row['secondary_color'] ?? null,
            light_color: row['light_color'] ?? null,
            notification_email: row['notification_email'] ?? null,
            webhook_url: row['webhook_url'] ?? null,
            send_sales_rep_voucher: Boolean(row['send_sales_rep_voucher']),
            disbursement_notification_email: row['disbursement_notification_email'] ?? null,
            state,
            created_at: new Date(String(row['created_at'])),
            updated_at: new Date(String(row['updated_at'])),
        });
    }
}
exports.PartnerMapper = PartnerMapper;
//# sourceMappingURL=partner.mapper.js.map