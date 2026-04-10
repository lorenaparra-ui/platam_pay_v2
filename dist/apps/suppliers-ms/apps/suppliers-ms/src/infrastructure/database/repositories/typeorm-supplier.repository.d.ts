import { Repository } from 'typeorm';
import { SupplierEntity } from '@app/suppliers-data';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { Supplier, CreateSupplierProps, UpdateSupplierProps } from '@modules/suppliers/domain/entities/supplier.entity';
export declare class TypeormSupplierRepository implements SupplierRepository {
    private readonly repo;
    constructor(repo: Repository<SupplierEntity>);
    private load_bank_account_id;
    find_by_external_id(external_id: string): Promise<Supplier | null>;
    find_all(): Promise<Supplier[]>;
    create(props: CreateSupplierProps): Promise<Supplier>;
    update_by_external_id(external_id: string, patch: UpdateSupplierProps): Promise<Supplier | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
