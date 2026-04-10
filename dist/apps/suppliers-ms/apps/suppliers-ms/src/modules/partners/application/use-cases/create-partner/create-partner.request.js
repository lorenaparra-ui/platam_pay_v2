"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePartnerRequest = void 0;
class CreatePartnerRequest {
    supplier_internal_id;
    acronym;
    logo_url;
    co_branding_logo_url;
    primary_color;
    secondary_color;
    light_color;
    notification_email;
    webhook_url;
    send_sales_rep_voucher;
    disbursement_notification_email;
    constructor(supplier_internal_id, acronym, logo_url, co_branding_logo_url, primary_color, secondary_color, light_color, notification_email, webhook_url, send_sales_rep_voucher, disbursement_notification_email) {
        this.supplier_internal_id = supplier_internal_id;
        this.acronym = acronym;
        this.logo_url = logo_url;
        this.co_branding_logo_url = co_branding_logo_url;
        this.primary_color = primary_color;
        this.secondary_color = secondary_color;
        this.light_color = light_color;
        this.notification_email = notification_email;
        this.webhook_url = webhook_url;
        this.send_sales_rep_voucher = send_sales_rep_voucher;
        this.disbursement_notification_email = disbursement_notification_email;
    }
}
exports.CreatePartnerRequest = CreatePartnerRequest;
//# sourceMappingURL=create-partner.request.js.map