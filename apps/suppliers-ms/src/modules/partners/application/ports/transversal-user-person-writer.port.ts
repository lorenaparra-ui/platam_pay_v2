export const TRANSVERSAL_USER_PERSON_WRITER_PORT = Symbol(
  'TRANSVERSAL_USER_PERSON_WRITER_PORT',
);

export interface TransversalUserPersonWriterPort {
  /** Encola comando en transversal-ms (usuario + persona); sin IDs síncronos. */
  publish_create_partner_user_command(input: Readonly<{
    correlation_id: string;
    idempotency_key: string;
    email: string;
    country_code: string | null;
    first_name: string;
    last_name: string;
    doc_type: string;
    doc_number: string;
    phone: string | null;
    city_external_id: string | null;
  }>): Promise<void>;
}
