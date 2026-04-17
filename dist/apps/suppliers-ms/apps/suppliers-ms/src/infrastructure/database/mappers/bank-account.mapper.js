"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountMapper = void 0;
const bank_account_entity_1 = require("../../../modules/bank-accounts/domain/entities/bank-account.entity");
class BankAccountMapper {
    static to_domain(row) {
        return new bank_account_entity_1.BankAccount(row.id, row.externalId, row.bankEntity, row.accountNumber, row.bankCertification ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new bank_account_entity_1.BankAccount(Number(row['id']), String(row['external_id']), String(row['bank_entity']), String(row['account_number']), row['bank_certification'] ?? null, new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.BankAccountMapper = BankAccountMapper;
//# sourceMappingURL=bank-account.mapper.js.map