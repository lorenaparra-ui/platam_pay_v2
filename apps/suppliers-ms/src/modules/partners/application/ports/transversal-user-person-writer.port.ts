export const TRANSVERSAL_USER_PERSON_WRITER_PORT = Symbol(
  'TRANSVERSAL_USER_PERSON_WRITER_PORT',
);

export interface TransversalUserPersonWriterPort {
  create_user_and_person(input: Readonly<{
    email: string;
    country_code: string | null;
    first_name: string;
    last_name: string;
    doc_type: string;
    doc_number: string;
    phone: string | null;
    city_external_id: string | null;
  }>): Promise<Readonly<{ user_external_id: string; person_external_id: string }>>;
}
