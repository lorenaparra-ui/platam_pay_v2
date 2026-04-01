import { BusinessPublicFields } from '@modules/businesses/application/mapping/business-public-fields.builder';

export class UpdateBusinessByExternalIdResponse implements BusinessPublicFields {
  internal_id: number;
  external_id: string;
  person_external_id: string;
  city_external_id: string | null;
  entity_type: string;
  business_name: string | null;
  business_address: string | null;
  business_type: string | null;
  relationship_to_business: string | null;
  legal_name: string | null;
  trade_name: string | null;
  tax_id: string | null;
  year_of_establishment: number | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: BusinessPublicFields) {
    Object.assign(this, fields);
  }
}
