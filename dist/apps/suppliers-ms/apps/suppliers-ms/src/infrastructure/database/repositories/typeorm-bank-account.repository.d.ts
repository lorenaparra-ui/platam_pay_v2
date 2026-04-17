import { Repository } from 'typeorm';
import { BankAccountEntity } from '@app/suppliers-data';
import { BankAccountRepository } from '@modules/bank-accounts/domain/repositories/bank-account.repository';
import { BankAccount, CreateBankAccountProps, UpdateBankAccountProps } from '@modules/bank-accounts/domain/entities/bank-account.entity';
export declare class TypeormBankAccountRepository implements BankAccountRepository {
    private readonly repo;
    constructor(repo: Repository<BankAccountEntity>);
    find_by_external_id(external_id: string): Promise<BankAccount | null>;
    find_all(): Promise<BankAccount[]>;
    create(props: CreateBankAccountProps): Promise<BankAccount>;
    update_by_external_id(external_id: string, patch: UpdateBankAccountProps): Promise<BankAccount | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
