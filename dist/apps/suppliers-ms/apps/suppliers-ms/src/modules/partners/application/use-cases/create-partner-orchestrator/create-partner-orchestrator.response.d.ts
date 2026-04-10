export declare class CreatePartnerOrchestratorResponse {
    readonly saga_external_id: string;
    readonly correlation_id: string;
    readonly credit_facility_external_id: string;
    readonly user_external_id: string | null;
    readonly person_external_id: string | null;
    readonly legal_representative_external_id: string | null;
    readonly business_external_id: string;
    readonly bank_certification_url: string;
    readonly logo_url: string;
    readonly co_branding_url: string;
    readonly bank_account_external_id: string | null;
    readonly supplier_external_id: string;
    readonly partner_external_id: string;
    constructor(saga_external_id: string, correlation_id: string, credit_facility_external_id: string, user_external_id: string | null, person_external_id: string | null, legal_representative_external_id: string | null, business_external_id: string, bank_certification_url: string, logo_url: string, co_branding_url: string, bank_account_external_id: string | null, supplier_external_id: string, partner_external_id: string);
}
