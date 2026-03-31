export class CreatePartnerOrchestratorResponse {
  constructor(
    readonly saga_external_id: string,
    readonly correlation_id: string,
    readonly credit_facility_external_id: string,
    /** `null` mientras transversal-ms procesa la cola create-partner-user (saga asíncrona). */
    readonly user_external_id: string | null,
    readonly person_external_id: string | null,
    readonly business_external_id: string,
    readonly bank_certification_url: string,
    readonly logo_url: string,
    readonly co_branding_url: string,
    readonly bank_account_external_id: string,
    readonly partner_external_id: string,
  ) {}
}
