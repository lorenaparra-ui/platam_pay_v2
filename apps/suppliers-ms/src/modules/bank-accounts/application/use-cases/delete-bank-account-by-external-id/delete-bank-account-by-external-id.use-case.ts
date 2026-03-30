import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BANK_ACCOUNT_REPOSITORY } from '@modules/bank-accounts/bank-accounts.tokens';
import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { DeleteBankAccountByExternalIdRequest } from './delete-bank-account-by-external-id.request';

@Injectable()
export class DeleteBankAccountByExternalIdUseCase {
  constructor(
    @Inject(BANK_ACCOUNT_REPOSITORY)
    private readonly bank_account_repository: BankAccountRepository,
  ) {}

  async execute(req: DeleteBankAccountByExternalIdRequest): Promise<void> {
    const ok = await this.bank_account_repository.delete_by_external_id(
      req.external_id,
    );
    if (!ok) {
      throw new NotFoundException('bank account not found');
    }
  }
}
