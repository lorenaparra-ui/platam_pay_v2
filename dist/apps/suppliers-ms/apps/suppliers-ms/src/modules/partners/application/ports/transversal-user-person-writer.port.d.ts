export declare const TRANSVERSAL_USER_PERSON_WRITER_PORT: unique symbol;
export interface TransversalUserPersonWriterPort {
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
