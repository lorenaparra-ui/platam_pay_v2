import { SupplierEntity } from '@app/suppliers-data';
import { Supplier } from '@modules/suppliers/domain/entities/supplier.entity';

export class SupplierMapper {
  static to_domain(
    row: SupplierEntity,
    bank_account_id: number | null,
  ): Supplier {
    return new Supplier(
      row.id,
      row.externalId,
      row.businessId,
      bank_account_id,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): Supplier {
    return new Supplier(
      Number(row['id']),
      String(row['external_id']),
      Number(row['business_id']),
      row['bank_account_id'] === null || row['bank_account_id'] === undefined
        ? null
        : Number(row['bank_account_id']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
