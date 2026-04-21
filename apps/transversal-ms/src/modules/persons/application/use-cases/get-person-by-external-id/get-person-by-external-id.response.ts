import { PersonPublicFields } from '@modules/persons/application/mapping/person-public-fields.builder';

export class GetPersonByExternalIdResponse implements PersonPublicFields {
  external_id: string;
  first_name: string;
  last_name: string;
  doc_type: string;
  doc_number: string;
  doc_issue_date: Date | null;
  birth_date: Date | null;
  gender: string | null;
  phone: string | null;
  residential_address: string | null;
  city_external_id: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: PersonPublicFields) {
    Object.assign(this, fields);
  }
}
