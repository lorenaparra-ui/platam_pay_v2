export declare const CREATE_PARTNER_USER_PORT = "CREATE_PARTNER_USER_PORT";
export interface CreatePartnerUserPayload {
    first_name: string;
    last_name: string;
    document_type: string;
    document_number: string;
    email: string;
    phone: string;
}
export interface CreatePartnerUserResult {
    user_id: number;
    external_id: string;
}
export interface CreatePartnerUserPort {
    createPartnerUser(payload: CreatePartnerUserPayload): Promise<CreatePartnerUserResult>;
}
