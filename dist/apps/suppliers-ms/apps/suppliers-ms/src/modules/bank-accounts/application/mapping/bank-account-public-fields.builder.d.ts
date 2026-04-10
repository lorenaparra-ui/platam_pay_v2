import { BankAccount } from '@modules/bank-accounts/domain/entities/bank-account.entity';
export interface BankAccountPublicFields {
    internal_id: number;
    external_id: string;
    bank_entity: string;
    account_number: string;
    bank_certification: string | null;
    created_at: Date;
    updated_at: Date;
}
export declare function build_bank_account_public_fields(account: BankAccount): BankAccountPublicFields;
