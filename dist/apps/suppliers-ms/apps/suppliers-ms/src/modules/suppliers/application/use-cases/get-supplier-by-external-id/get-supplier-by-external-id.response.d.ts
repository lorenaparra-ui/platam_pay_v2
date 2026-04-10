import { SupplierPublicFields } from '@modules/suppliers/application/mapping/supplier-public-fields.builder';
export declare class GetSupplierByExternalIdResponse implements SupplierPublicFields {
    internal_id: number;
    external_id: string;
    business_external_id: string;
    bank_account_external_id: string | null;
    created_at: Date;
    updated_at: Date;
    constructor(fields: SupplierPublicFields);
}
