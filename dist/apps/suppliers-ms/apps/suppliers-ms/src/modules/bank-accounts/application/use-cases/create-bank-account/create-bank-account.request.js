"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBankAccountRequest = void 0;
class CreateBankAccountRequest {
    bank_entity;
    account_number;
    bank_certification;
    constructor(bank_entity, account_number, bank_certification) {
        this.bank_entity = bank_entity;
        this.account_number = account_number;
        this.bank_certification = bank_certification;
    }
}
exports.CreateBankAccountRequest = CreateBankAccountRequest;
//# sourceMappingURL=create-bank-account.request.js.map