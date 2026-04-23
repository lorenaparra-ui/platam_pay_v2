export const CLIENT_REGISTRATION_PORT = Symbol('CLIENT_REGISTRATION_PORT');

export interface PersonPipelineData {
  internal_id: number;
  doc_number: string;
  doc_type: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
}

export interface CreatePersonData {
  first_name: string;
  last_name: string;
  doc_type: string;
  doc_number: string;
  phone?: string | null;
  email?: string | null;
  city_id?: number | null;
}

export interface CreateBusinessData {
  person_id: number;
  entity_type: string;
  business_name?: string | null;
  business_address?: string | null;
  business_type?: string | null;
  relationship_to_business?: string | null;
  city_id?: number | null;
}

export interface ClientRegistrationPort {
  find_person_by_doc_number(doc_number: string): Promise<number | null>;
  create_person(data: CreatePersonData): Promise<number>;
  get_person_internal_id_by_external_id(external_id: string): Promise<number | null>;
  patch_person_email_and_birth_date(
    person_id: number,
    email: string | null,
    birth_date_iso: string | null,
  ): Promise<void>;
  find_business_by_person_id(person_id: number): Promise<number | null>;
  create_business(data: CreateBusinessData): Promise<number>;
  resolve_city_internal_id(city_external_id: string): Promise<number | null>;
  get_person_for_pipeline(person_id: number): Promise<PersonPipelineData | null>;
}
