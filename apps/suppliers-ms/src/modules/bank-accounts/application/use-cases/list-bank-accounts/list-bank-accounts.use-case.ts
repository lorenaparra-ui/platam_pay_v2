import { Inject, Injectable } from '@nestjs/common';
import { BANK_ACCOUNT_REPOSITORY } from '@modules/bank-accounts/bank-accounts.tokens';
import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { build_bank_account_public_fields } from '@modules/bank-accounts/application/mapping/bank-account-public-fields.builder';
import { ListBankAccountsItemResponse } from './list-bank-accounts.response';

@Injectable()
export class ListBankAccountsUseCase {
  constructor(
    @Inject(BANK_ACCOUNT_REPOSITORY)
    private readonly bank_account_repository: BankAccountRepository,
  ) {}

  async execute(): Promise<ListBankAccountsItemResponse[]> {
    const rows = await this.bank_account_repository.find_all();
    return rows.map(
      (row) =>
        new ListBankAccountsItemResponse(build_bank_account_public_fields(row)),
    );
  }
}
