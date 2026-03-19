export const PARTNER_USER_CREATOR = "PARTNER_USER_CREATOR";

export interface PartnerUserCreatorPort {
  createUser(payload: {
    first_name: string;
    last_name: string;
    document_type: string;
    document_number: string;
    email: string;
    phone?: string;
    business_id: number;
    partner_external_id: string;
  }): Promise<{ user_id: number; external_id: string }>;
}
