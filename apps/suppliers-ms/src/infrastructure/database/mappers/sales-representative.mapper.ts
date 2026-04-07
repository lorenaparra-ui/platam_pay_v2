import { SalesRepresentativeEntity } from '@app/suppliers-data';
import { SalesRepresentative } from '@modules/sales-representatives/domain/entities/sales-representative.entity';

export class SalesRepresentativeMapper {
  static to_domain(row: SalesRepresentativeEntity): SalesRepresentative {
    return new SalesRepresentative(
      Number(row.id),
      row.externalId,
      Number(row.partnerId),
      row.userId === null || row.userId === undefined ? null : Number(row.userId),
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): SalesRepresentative {
    const user_raw = row['user_id'];
    return new SalesRepresentative(
      Number(row['id']),
      String(row['external_id']),
      Number(row['partner_id']),
      user_raw === null || user_raw === undefined ? null : Number(user_raw),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
