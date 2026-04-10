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
exports.ListBankAccountsUseCase = void 0;
const common_1 = require("@nestjs/common");
const bank_accounts_tokens_1 = require("../../../bank-accounts.tokens");
const bank_account_public_fields_builder_1 = require("../../mapping/bank-account-public-fields.builder");
const list_bank_accounts_response_1 = require("./list-bank-accounts.response");
let ListBankAccountsUseCase = class ListBankAccountsUseCase {
    bank_account_repository;
    constructor(bank_account_repository) {
        this.bank_account_repository = bank_account_repository;
    }
    async execute() {
        const rows = await this.bank_account_repository.find_all();
        return rows.map((row) => new list_bank_accounts_response_1.ListBankAccountsItemResponse((0, bank_account_public_fields_builder_1.build_bank_account_public_fields)(row)));
    }
};
exports.ListBankAccountsUseCase = ListBankAccountsUseCase;
exports.ListBankAccountsUseCase = ListBankAccountsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListBankAccountsUseCase);
//# sourceMappingURL=list-bank-accounts.use-case.js.map