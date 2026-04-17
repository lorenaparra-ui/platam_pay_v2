import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { ListBankAccountsItemResponse } from './list-bank-accounts.response';
export declare class ListBankAccountsUseCase {
    private readonly bank_account_repository;
    constructor(bank_account_repository: BankAccountRepository);
    execute(): Promise<ListBankAccountsItemResponse[]>;
}
