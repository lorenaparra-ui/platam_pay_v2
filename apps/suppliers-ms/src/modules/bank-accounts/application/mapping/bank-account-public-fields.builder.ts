import { BankAccount } from '@modules/bank-accounts/domain/entities/bank-account.entity';

export interface BankAccountPublicFields {
  external_id: string;
  bank_entity: string;
  account_number: string;
  bank_certification: string | null;
  created_at: Date;
  updated_at: Date;
}

export function build_bank_account_public_fields(
  account: BankAccount,
): BankAccountPublicFields {
  return {
    external_id: account.external_id,
    bank_entity: account.bank_entity,
    account_number: account.account_number,
    bank_certification: account.bank_certification,
    created_at: account.created_at,
    updated_at: account.updated_at,
  };
}
