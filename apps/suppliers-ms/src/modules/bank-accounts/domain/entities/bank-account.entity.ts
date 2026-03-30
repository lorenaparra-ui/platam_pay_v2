export class BankAccount {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly bank_entity: string,
    readonly account_number: string,
    readonly bank_certification: string | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateBankAccountProps {
  bank_entity: string;
  account_number: string;
  bank_certification: string | null;
}

export type UpdateBankAccountProps = Partial<CreateBankAccountProps>;
