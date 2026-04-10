import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { Supplier } from '@modules/suppliers/domain/entities/supplier.entity';
export interface SupplierPublicFields {
    internal_id: number;
    external_id: string;
    business_external_id: string;
    bank_account_external_id: string | null;
    created_at: Date;
    updated_at: Date;
}
export declare function build_supplier_public_fields(supplier: Supplier, lookup: SuppliersReferenceLookupPort): Promise<SupplierPublicFields>;
