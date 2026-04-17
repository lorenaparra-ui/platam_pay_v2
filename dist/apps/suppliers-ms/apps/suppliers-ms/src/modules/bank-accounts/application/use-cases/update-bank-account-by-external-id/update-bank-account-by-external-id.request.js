"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBankAccountByExternalIdRequest = void 0;
class UpdateBankAccountByExternalIdRequest {
    external_id;
    bank_entity;
    account_number;
    bank_certification;
    constructor(external_id, bank_entity, account_number, bank_certification) {
        this.external_id = external_id;
        this.bank_entity = bank_entity;
        this.account_number = account_number;
        this.bank_certification = bank_certification;
    }
}
exports.UpdateBankAccountByExternalIdRequest = UpdateBankAccountByExternalIdRequest;
//# sourceMappingURL=update-bank-account-by-external-id.request.js.map