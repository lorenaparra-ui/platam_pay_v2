import { CreditFacility } from '@modules/credit-facilities/domain/models/credit-facility.models';

export interface CreditFacilityPublicFields {
  external_id: string;
  contract_id: string | null;
  state: string;
  total_limit: string;
  created_at: Date;
  updated_at: Date;
}

export function build_credit_facility_public_fields(
  row: CreditFacility,
): CreditFacilityPublicFields {
  return {
    external_id: row.external_id,
    contract_id: row.contract_id,
    state: row.state,
    total_limit: row.total_limit,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
