import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { DeleteBankAccountByExternalIdRequest } from './delete-bank-account-by-external-id.request';
export declare class DeleteBankAccountByExternalIdUseCase {
    private readonly bank_account_repository;
    constructor(bank_account_repository: BankAccountRepository);
    execute(req: DeleteBankAccountByExternalIdRequest): Promise<void>;
}
