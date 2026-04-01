import { ContractEntity, CreditFacilityEntity } from '@app/products-data';
import { CreditFacility } from '@modules/credit-facilities/domain/models/credit-facility.models';
import { Statuses } from '@platam/shared';

function contract_join_to_external_id(
  ref: ContractEntity | null | undefined,
): string | null {
  if (ref === null || ref === undefined) {
    return null;
  }
  return ref.externalId ?? null;
}

export class CreditFacilityMapper {
  static to_domain(row: CreditFacilityEntity): CreditFacility {
    return new CreditFacility(
      row.id,
      row.externalId,
      contract_join_to_external_id(row.contractId),
      row.state,
      row.totalLimit,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): CreditFacility {
    const state_raw = String(row['state'] ?? Statuses.ACTIVE);
    const state =
      state_raw === Statuses.INACTIVE
        ? Statuses.INACTIVE
        : Statuses.ACTIVE;

    return new CreditFacility(
      Number(row['id']),
      String(row['external_id']),
      row['contract_id'] === null || row['contract_id'] === undefined
        ? null
        : String(row['contract_id']),
      state,
      String(row['total_limit']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
