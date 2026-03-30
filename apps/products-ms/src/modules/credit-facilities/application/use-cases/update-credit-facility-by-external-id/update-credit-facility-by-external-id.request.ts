export class UpdateCreditFacilityByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly contract_id: string | null | undefined,
    readonly total_limit: string | undefined,
    readonly status_external_id: string | undefined,
  ) {}
}
