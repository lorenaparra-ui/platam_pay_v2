import { SupplierPublicFields } from '@modules/suppliers/application/mapping/supplier-public-fields.builder';

export class UpdateSupplierByExternalIdResponse implements SupplierPublicFields {
  external_id: string;
  business_external_id: string;
  bank_account_external_id: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: SupplierPublicFields) {
    Object.assign(this, fields);
  }
}
