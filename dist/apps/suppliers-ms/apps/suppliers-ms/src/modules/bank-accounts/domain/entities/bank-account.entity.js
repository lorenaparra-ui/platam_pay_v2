"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    internal_id;
    external_id;
    bank_entity;
    account_number;
    bank_certification;
    created_at;
    updated_at;
    constructor(internal_id, external_id, bank_entity, account_number, bank_certification, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.bank_entity = bank_entity;
        this.account_number = account_number;
        this.bank_certification = bank_certification;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.BankAccount = BankAccount;
//# sourceMappingURL=bank-account.entity.js.map