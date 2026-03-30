export class CreateCreditFacilityRequest {
  constructor(
    readonly contract_id: string | null,
    readonly total_limit: string,
    readonly status_external_id: string,
    readonly external_id?: string,
  ) {}
}
