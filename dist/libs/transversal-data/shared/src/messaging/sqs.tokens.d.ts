export declare const SQS_CLIENT: unique symbol;
export declare const QUEUES_CONFIG: unique symbol;
export type SqsQueuesUrlsConfig = Readonly<{
    outbound_queue_url: string;
    inbound_queue_url?: string;
    upload_files_queue_url?: string;
    create_partner_user_queue_url?: string;
    create_person_queue_url?: string;
    suppliers_callback_queue_url?: string;
    contracts_create_inbound_queue_url?: string;
    contracts_get_inbound_queue_url?: string;
}>;
