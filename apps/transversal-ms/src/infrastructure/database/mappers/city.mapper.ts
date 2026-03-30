import type { City } from '@modules/transversal/catalog/domain/models/city.models';

export class CityMapper {
  static from_raw_row(row: Record<string, unknown>): City {
    return {
      id: Number(row['id']),
      external_id: String(row['external_id']),
      country_name: String(row['country_name']),
      country_code: String(row['country_code']),
      state_name: String(row['state_name']),
      state_code:
        row['state_code'] === null || row['state_code'] === undefined
          ? null
          : String(row['state_code']),
      city_name: String(row['city_name']),
      currency_id: Number(row['currency_id']),
      currency_external_id: String(row['currency_external_id']),
      created_at: new Date(String(row['created_at'])),
      updated_at: new Date(String(row['updated_at'])),
    };
  }
}
