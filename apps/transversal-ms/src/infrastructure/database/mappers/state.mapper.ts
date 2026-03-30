import { StateEntity } from '@app/transversal-data';
import type { State } from '@modules/transversal/catalog/domain/models/state.models';

export class StateMapper {
  static to_domain(row: StateEntity): State {
    return {
      id: row.id,
      external_id: row.externalId,
      country_code: row.countryCode,
      state_name: row.stateName,
      state_code: row.stateCode ?? null,
      created_at: row.createdAt,
      updated_at: row.updatedAt,
    };
  }

  static from_raw_row(row: Record<string, unknown>): State {
    return {
      id: Number(row['id']),
      external_id: String(row['external_id']),
      country_code: String(row['country_code']),
      state_name: String(row['state_name']),
      state_code:
        row['state_code'] === null || row['state_code'] === undefined
          ? null
          : String(row['state_code']),
      created_at: new Date(String(row['created_at'])),
      updated_at: new Date(String(row['updated_at'])),
    };
  }
}
