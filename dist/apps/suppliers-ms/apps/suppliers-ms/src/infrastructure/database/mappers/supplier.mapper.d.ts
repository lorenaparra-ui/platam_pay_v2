import { SupplierEntity } from '@app/suppliers-data';
import { Supplier } from '@modules/suppliers/domain/entities/supplier.entity';
export declare class SupplierMapper {
    static to_domain(row: SupplierEntity, bank_account_id: number | null): Supplier;
    static from_raw_row(row: Record<string, unknown>): Supplier;
}
