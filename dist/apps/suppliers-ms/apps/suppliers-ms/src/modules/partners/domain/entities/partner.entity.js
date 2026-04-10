"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partner = void 0;
const shared_1 = require("../../../../../../../libs/shared/src");
class Partner extends shared_1.Entity {
    constructor(props) {
        super(props);
    }
    get id() {
        return this.props.external_id;
    }
    get internal_id() {
        return this.props.internal_id;
    }
    get supplier_id() {
        return this.props.supplier_id;
    }
    get external_id() {
        return this.props.external_id;
    }
    get acronym() {
        return this.props.acronym;
    }
    get logo_url() {
        return this.props.logo_url;
    }
    get co_branding_logo_url() {
        return this.props.co_branding_logo_url;
    }
    get primary_color() {
        return this.props.primary_color;
    }
    get secondary_color() {
        return this.props.secondary_color;
    }
    get light_color() {
        return this.props.light_color;
    }
    get notification_email() {
        return this.props.notification_email;
    }
    get webhook_url() {
        return this.props.webhook_url;
    }
    get send_sales_rep_voucher() {
        return this.props.send_sales_rep_voucher;
    }
    get disbursement_notification_email() {
        return this.props.disbursement_notification_email;
    }
    get state() {
        return this.props.state;
    }
    get created_at() {
        return this.props.created_at;
    }
    get updated_at() {
        return this.props.updated_at;
    }
    toPrimitives() {
        return { ...this.props };
    }
}
exports.Partner = Partner;
//# sourceMappingURL=partner.entity.js.map