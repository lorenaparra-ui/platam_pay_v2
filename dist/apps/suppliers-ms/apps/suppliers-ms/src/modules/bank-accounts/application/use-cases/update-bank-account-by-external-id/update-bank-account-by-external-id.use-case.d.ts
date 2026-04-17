import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { UpdateBankAccountByExternalIdRequest } from './update-bank-account-by-external-id.request';
import { UpdateBankAccountByExternalIdResponse } from './update-bank-account-by-external-id.response';
export declare class UpdateBankAccountByExternalIdUseCase {
    private readonly bank_account_repository;
    constructor(bank_account_repository: BankAccountRepository);
    execute(req: UpdateBankAccountByExternalIdRequest): Promise<UpdateBankAccountByExternalIdResponse>;
}
