import { CreditFacilityStatusLookupPort } from '@modules/credit-facilities/domain/ports/credit-facility-status-lookup.port';
import { CreditFacility } from '@modules/credit-facilities/domain/models/credit-facility.models';

export interface CreditFacilityPublicFields {
  external_id: string;
  contract_id: string | null;
  status_external_id: string;
  total_limit: string;
  created_at: Date;
  updated_at: Date;
}

export async function build_credit_facility_public_fields(
  row: CreditFacility,
  status_lookup: CreditFacilityStatusLookupPort,
): Promise<CreditFacilityPublicFields> {
  const status_external_id =
    await status_lookup.get_status_external_id_by_internal_id(row.status_id);
  if (status_external_id === null) {
    throw new Error('credit facility status resolution failed');
  }

  return {
    external_id: row.external_id,
    contract_id: row.contract_id,
    status_external_id,
    total_limit: row.total_limit,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
