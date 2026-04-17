"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
class Supplier {
    internal_id;
    external_id;
    business_id;
    bank_account_id;
    created_at;
    updated_at;
    constructor(internal_id, external_id, business_id, bank_account_id, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.business_id = business_id;
        this.bank_account_id = bank_account_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Supplier = Supplier;
//# sourceMappingURL=supplier.entity.js.map