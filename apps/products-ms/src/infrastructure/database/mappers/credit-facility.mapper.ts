import { CreditFacilityEntity } from '@app/products-data';
import { CreditFacility } from '@modules/credit-facilities/domain/models/credit-facility.models';

export class CreditFacilityMapper {
  static to_domain(row: CreditFacilityEntity): CreditFacility {
    return new CreditFacility(
      row.id,
      row.externalId,
      row.contractId ?? null,
      row.statusId,
      row.totalLimit,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): CreditFacility {
    return new CreditFacility(
      Number(row['id']),
      String(row['external_id']),
      row['contract_id'] === null || row['contract_id'] === undefined
        ? null
        : String(row['contract_id']),
      Number(row['status_id']),
      String(row['total_limit']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
