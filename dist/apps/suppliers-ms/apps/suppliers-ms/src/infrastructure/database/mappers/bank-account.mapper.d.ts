import { BankAccountEntity } from '@app/suppliers-data';
import { BankAccount } from '@modules/bank-accounts/domain/entities/bank-account.entity';
export declare class BankAccountMapper {
    static to_domain(row: BankAccountEntity): BankAccount;
    static from_raw_row(row: Record<string, unknown>): BankAccount;
}
