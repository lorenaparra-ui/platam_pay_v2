import { CreditFacilityPublicFields } from '@modules/credit-facilities/application/mapping/credit-facility-public-fields.builder';

export class CreateCreditFacilityResponse implements CreditFacilityPublicFields {
  external_id: string;
  contract_id: string | null;
  state: string;
  total_limit: string;
  created_at: Date;
  updated_at: Date;

  constructor(fields: CreditFacilityPublicFields) {
    Object.assign(this, fields);
  }
}
