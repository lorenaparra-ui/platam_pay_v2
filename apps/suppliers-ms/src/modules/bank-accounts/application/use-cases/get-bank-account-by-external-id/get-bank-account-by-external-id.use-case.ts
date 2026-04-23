import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BANK_ACCOUNT_REPOSITORY } from '@modules/bank-accounts/bank-accounts.tokens';
import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { build_bank_account_public_fields } from '@modules/bank-accounts/application/mapping/bank-account-public-fields.builder';
import { GetBankAccountByExternalIdRequest } from './get-bank-account-by-external-id.request';
import { GetBankAccountByExternalIdResponse } from './get-bank-account-by-external-id.response';

@Injectable()
export class GetBankAccountByExternalIdUseCase {
  constructor(
    @Inject(BANK_ACCOUNT_REPOSITORY)
    private readonly bank_account_repository: BankAccountRepository,
  ) {}

  async execute(
    req: GetBankAccountByExternalIdRequest,
  ): Promise<GetBankAccountByExternalIdResponse> {
    const row = await this.bank_account_repository.find_by_external_id(
      req.external_id,
    );
    if (row === null) {
      throw new NotFoundException('bank account not found');
    }
    const fields = build_bank_account_public_fields(row);
    return new GetBankAccountByExternalIdResponse(fields);
  }
}
