import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { GetBankAccountByExternalIdRequest } from './get-bank-account-by-external-id.request';
import { GetBankAccountByExternalIdResponse } from './get-bank-account-by-external-id.response';
export declare class GetBankAccountByExternalIdUseCase {
    private readonly bank_account_repository;
    constructor(bank_account_repository: BankAccountRepository);
    execute(req: GetBankAccountByExternalIdRequest): Promise<GetBankAccountByExternalIdResponse>;
}
