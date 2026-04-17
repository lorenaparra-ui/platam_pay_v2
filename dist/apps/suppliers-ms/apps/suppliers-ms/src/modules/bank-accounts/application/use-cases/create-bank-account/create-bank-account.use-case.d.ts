import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { CreateBankAccountRequest } from './create-bank-account.request';
import { CreateBankAccountResponse } from './create-bank-account.response';
export declare class CreateBankAccountUseCase {
    private readonly bank_account_repository;
    constructor(bank_account_repository: BankAccountRepository);
    execute(req: CreateBankAccountRequest): Promise<CreateBankAccountResponse>;
}
