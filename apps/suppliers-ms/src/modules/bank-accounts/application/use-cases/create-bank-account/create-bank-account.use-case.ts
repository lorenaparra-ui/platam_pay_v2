import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BANK_ACCOUNT_REPOSITORY } from '@modules/bank-accounts/bank-accounts.tokens';
import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { build_bank_account_public_fields } from '@modules/bank-accounts/application/mapping/bank-account-public-fields.builder';
import { CreateBankAccountRequest } from './create-bank-account.request';
import { CreateBankAccountResponse } from './create-bank-account.response';

@Injectable()
export class CreateBankAccountUseCase {
  constructor(
    @Inject(BANK_ACCOUNT_REPOSITORY)
    private readonly bank_account_repository: BankAccountRepository,
  ) {}

  async execute(req: CreateBankAccountRequest): Promise<CreateBankAccountResponse> {
    if (req.bank_entity.trim().length === 0) {
      throw new BadRequestException('bank_entity required');
    }
    if (req.account_number.trim().length === 0) {
      throw new BadRequestException('account_number required');
    }

    const created = await this.bank_account_repository.create({
      bank_entity: req.bank_entity.trim(),
      account_number: req.account_number.trim(),
      bank_certification: req.bank_certification,
    });

    const fields = build_bank_account_public_fields(created);
    return new CreateBankAccountResponse(fields);
  }
}
