export class CreatePartnerOrchestratorResponse {
  constructor(
    readonly saga_external_id: string,
    readonly correlation_id: string,
    readonly credit_facility_external_id: string,
    readonly user_external_id: string | null,
    readonly person_external_id: string | null,
    /** `null` si no se envió representante legal en el payload. */
    readonly legal_representative_external_id: string | null,
    readonly business_external_id: string,
    readonly bank_certification_url: string,
    readonly logo_url: string,
    readonly co_branding_url: string,
    readonly bank_account_external_id: string | null,
    readonly supplier_external_id: string,
    readonly partner_external_id: string,
  ) {}
}
