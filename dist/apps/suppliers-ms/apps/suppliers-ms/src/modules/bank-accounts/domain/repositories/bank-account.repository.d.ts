import { BankAccount, CreateBankAccountProps, UpdateBankAccountProps } from '@modules/bank-accounts/domain/entities/bank-account.entity';
export interface BankAccountRepository {
    find_by_external_id(external_id: string): Promise<BankAccount | null>;
    find_all(): Promise<BankAccount[]>;
    create(props: CreateBankAccountProps): Promise<BankAccount>;
    update_by_external_id(external_id: string, patch: UpdateBankAccountProps): Promise<BankAccount | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
