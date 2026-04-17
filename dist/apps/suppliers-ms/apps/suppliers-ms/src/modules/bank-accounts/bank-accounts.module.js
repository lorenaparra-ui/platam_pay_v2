"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountsModule = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const typeorm_bank_account_repository_1 = require("../../infrastructure/database/repositories/typeorm-bank-account.repository");
const bank_accounts_tokens_1 = require("./bank-accounts.tokens");
const create_bank_account_use_case_1 = require("./application/use-cases/create-bank-account/create-bank-account.use-case");
const get_bank_account_by_external_id_use_case_1 = require("./application/use-cases/get-bank-account-by-external-id/get-bank-account-by-external-id.use-case");
const list_bank_accounts_use_case_1 = require("./application/use-cases/list-bank-accounts/list-bank-accounts.use-case");
const update_bank_account_by_external_id_use_case_1 = require("./application/use-cases/update-bank-account-by-external-id/update-bank-account-by-external-id.use-case");
const delete_bank_account_by_external_id_use_case_1 = require("./application/use-cases/delete-bank-account-by-external-id/delete-bank-account-by-external-id.use-case");
let BankAccountsModule = class BankAccountsModule {
};
exports.BankAccountsModule = BankAccountsModule;
exports.BankAccountsModule = BankAccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            {
                provide: bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY,
                useExisting: typeorm_bank_account_repository_1.TypeormBankAccountRepository,
            },
            create_bank_account_use_case_1.CreateBankAccountUseCase,
            get_bank_account_by_external_id_use_case_1.GetBankAccountByExternalIdUseCase,
            list_bank_accounts_use_case_1.ListBankAccountsUseCase,
            update_bank_account_by_external_id_use_case_1.UpdateBankAccountByExternalIdUseCase,
            delete_bank_account_by_external_id_use_case_1.DeleteBankAccountByExternalIdUseCase,
        ],
        exports: [
            bank_accounts_tokens_1.BANK_ACCOUNT_REPOSITORY,
            create_bank_account_use_case_1.CreateBankAccountUseCase,
            get_bank_account_by_external_id_use_case_1.GetBankAccountByExternalIdUseCase,
            list_bank_accounts_use_case_1.ListBankAccountsUseCase,
            update_bank_account_by_external_id_use_case_1.UpdateBankAccountByExternalIdUseCase,
            delete_bank_account_by_external_id_use_case_1.DeleteBankAccountByExternalIdUseCase,
        ],
    })
], BankAccountsModule);
//# sourceMappingURL=bank-accounts.module.js.map