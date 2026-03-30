export class CreatePartnerOrchestratorResponse {
  constructor(
    readonly saga_external_id: string,
    readonly correlation_id: string,
    readonly credit_facility_external_id: string,
    readonly user_external_id: string,
    readonly person_external_id: string,
    readonly business_external_id: string,
    readonly bank_certification_url: string,
    readonly logo_url: string,
    readonly co_branding_url: string,
    readonly bank_account_external_id: string,
    readonly partner_external_id: string,
  ) {}
}
