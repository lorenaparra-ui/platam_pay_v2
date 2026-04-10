"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartnerByExternalIdRequest = void 0;
class UpdatePartnerByExternalIdRequest {
    external_id;
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
    state;
    constructor(external_id, acronym, logo_url, co_branding_logo_url, primary_color, secondary_color, light_color, notification_email, webhook_url, send_sales_rep_voucher, disbursement_notification_email, state) {
        this.external_id = external_id;
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
        this.state = state;
    }
}
exports.UpdatePartnerByExternalIdRequest = UpdatePartnerByExternalIdRequest;
//# sourceMappingURL=update-partner-by-external-id.request.js.map