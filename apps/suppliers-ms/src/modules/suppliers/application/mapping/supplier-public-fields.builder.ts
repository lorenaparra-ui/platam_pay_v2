import { InternalServerErrorException } from '@nestjs/common';
import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { Supplier } from '@modules/suppliers/domain/entities/supplier.entity';

export interface SupplierPublicFields {
  external_id: string;
  business_external_id: string;
  bank_account_external_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function build_supplier_public_fields(
  supplier: Supplier,
  lookup: SuppliersReferenceLookupPort,
): Promise<SupplierPublicFields> {
  const business_external_id =
    await lookup.get_business_external_id_by_internal_id(supplier.business_id);
  if (!business_external_id) {
    throw new InternalServerErrorException();
  }

  let bank_account_external_id: string | null = null;
  if (supplier.bank_account_id !== null) {
    bank_account_external_id =
      await lookup.get_bank_account_external_id_by_internal_id(
        supplier.bank_account_id,
      );
    if (!bank_account_external_id) {
      throw new InternalServerErrorException();
    }
  }

  return {
    external_id: supplier.external_id,
    business_external_id,
    bank_account_external_id,
    created_at: supplier.created_at,
    updated_at: supplier.updated_at,
  };
}
