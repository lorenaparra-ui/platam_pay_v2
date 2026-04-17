"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_bank_account_public_fields = build_bank_account_public_fields;
function build_bank_account_public_fields(account) {
    return {
        internal_id: account.internal_id,
        external_id: account.external_id,
        bank_entity: account.bank_entity,
        account_number: account.account_number,
        bank_certification: account.bank_certification,
        created_at: account.created_at,
        updated_at: account.updated_at,
    };
}
//# sourceMappingURL=bank-account-public-fields.builder.js.map