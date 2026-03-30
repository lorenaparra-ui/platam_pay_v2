import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BANK_ACCOUNT_REPOSITORY } from '@modules/bank-accounts/bank-accounts.tokens';
import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { UpdateBankAccountProps } from '@modules/bank-accounts/domain/entities/bank-account.entity';
import { build_bank_account_public_fields } from '@modules/bank-accounts/application/mapping/bank-account-public-fields.builder';
import { UpdateBankAccountByExternalIdRequest } from './update-bank-account-by-external-id.request';
import { UpdateBankAccountByExternalIdResponse } from './update-bank-account-by-external-id.response';

@Injectable()
export class UpdateBankAccountByExternalIdUseCase {
  constructor(
    @Inject(BANK_ACCOUNT_REPOSITORY)
    private readonly bank_account_repository: BankAccountRepository,
  ) {}

  async execute(
    req: UpdateBankAccountByExternalIdRequest,
  ): Promise<UpdateBankAccountByExternalIdResponse> {
    const patch: UpdateBankAccountProps = {};

    if (req.bank_entity !== undefined) {
      if (req.bank_entity.trim().length === 0) {
        throw new BadRequestException('bank_entity required');
      }
      patch.bank_entity = req.bank_entity.trim();
    }
    if (req.account_number !== undefined) {
      if (req.account_number.trim().length === 0) {
        throw new BadRequestException('account_number required');
      }
      patch.account_number = req.account_number.trim();
    }
    if (req.bank_certification !== undefined) {
      patch.bank_certification = req.bank_certification;
    }

    const updated = await this.bank_account_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('bank account not found');
    }

    const fields = build_bank_account_public_fields(updated);
    return new UpdateBankAccountByExternalIdResponse(fields);
  }
}
