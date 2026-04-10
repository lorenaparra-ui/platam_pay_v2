"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentative = void 0;
class SalesRepresentative {
    internal_id;
    external_id;
    partner_id;
    user_id;
    created_at;
    updated_at;
    constructor(internal_id, external_id, partner_id, user_id, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.partner_id = partner_id;
        this.user_id = user_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.SalesRepresentative = SalesRepresentative;
//# sourceMappingURL=sales-representative.entity.js.map