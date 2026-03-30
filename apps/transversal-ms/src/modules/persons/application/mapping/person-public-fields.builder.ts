import { Person } from '@modules/persons/domain/models/person.models';
import type { UserRepository } from '@modules/users/domain/ports/user.ports';
import type { CityRepository } from '@modules/transversal/catalog/domain/ports/city.repository.port';

export interface PersonPublicFields {
  external_id: string;
  user_external_id: string;
  country_code: string | null;
  first_name: string;
  last_name: string;
  doc_type: string;
  doc_number: string;
  doc_issue_date: Date | null;
  birth_date: Date | null;
  gender: string | null;
  phone: string | null;
  residential_address: string | null;
  business_address: string | null;
  city_external_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function build_person_public_fields(
  row: Person,
  user_repo: UserRepository,
  city_repo: CityRepository,
): Promise<PersonPublicFields> {
  const user_external_id = await user_repo.find_external_id_by_internal_id(
    row.user_id,
  );
  let city_external_id: string | null = null;
  if (row.city_id !== null) {
    const city = await city_repo.find_by_internal_id(row.city_id);
    city_external_id = city?.external_id ?? null;
  }

  if (user_external_id === null) {
    throw new Error('person user reference resolution failed');
  }
  if (row.city_id !== null && city_external_id === null) {
    throw new Error('person city reference resolution failed');
  }

  return {
    external_id: row.external_id,
    user_external_id,
    country_code: row.country_code,
    first_name: row.first_name,
    last_name: row.last_name,
    doc_type: row.doc_type,
    doc_number: row.doc_number,
    doc_issue_date: row.doc_issue_date,
    birth_date: row.birth_date,
    gender: row.gender,
    phone: row.phone,
    residential_address: row.residential_address,
    business_address: row.business_address,
    city_external_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
