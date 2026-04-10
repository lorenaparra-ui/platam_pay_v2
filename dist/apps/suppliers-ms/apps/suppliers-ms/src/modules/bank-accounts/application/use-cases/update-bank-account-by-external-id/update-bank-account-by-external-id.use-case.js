"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBankAccountByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const bank_accounts_tokens_1 = require("../../../bank-accounts.tokens");
const bank_account_public_fields_builder_1 = require("../../mapping/bank-account-public-fields.builder");
const update_bank_account_by_external_id_response_1 = require("./update-bank-account-by-external-id.response");
let UpdateBankAccountByExternalIdUseCase = class UpdateBankAccountByExternalIdUseCase {
    bank_account_repository;
    constructor(bank_account_repository) {
        this.bank_account_repository = bank_account_repository;
    }
    async execute(req) {
        const patch = {};
        if (req.bank_entity !== undefined) {
            if (req.bank_entity.trim().length === 0) {
                throw new common_1.BadRequestException('bank_entity required');
            }
            patch.bank_entity = req.bank_entity.trim();
        }
        if (req.account_number !== undefined) {
            if (req.account_number.trim().length === 0) {
                throw new common_1.BadRequestException('account_number required');
            }
            patch.account_number = req.account_number.trim();
        }
        if (req.bank_certification !== undefined) {
            patch.bank_certification = req.bank_certification;
        }
        const updated = await this.bank_account_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('bank account not found');
        }
        const fields = (0, bank_account_public_fields_builder_1.build_bank_account_public_fields)(updated);
        return new update_bank_account_by_external_id_response_1.UpdateBankAccountByExternalIdResponse(fields);
    }
};
exports.UpdateBankAccountByExternalIdUseCase = UpdateBankAccountByExternalIdUseCase;
exports.UpdateBankAccountByExternalIdUseCase = UpdateBankAccountByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateBankAccountByExternalIdUseCase);
//# sourceMappingURL=update-bank-account-by-external-id.use-case.js.map