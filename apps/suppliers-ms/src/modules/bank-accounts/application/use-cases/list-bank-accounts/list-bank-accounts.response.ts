import { BankAccountPublicFields } from '@modules/bank-accounts/application/mapping/bank-account-public-fields.builder';

export class ListBankAccountsItemResponse implements BankAccountPublicFields {
  external_id: string;
  bank_entity: string;
  account_number: string;
  bank_certification: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: BankAccountPublicFields) {
    Object.assign(this, fields);
  }
}
