export class UpdateSalesRepresentativeUserByExternalIdRequest {
  constructor(
    readonly external_id: string,
    /** `undefined` = no operación; `null` = desvincular usuario; string = UUID de usuario */
    readonly user_external_id: string | null | undefined,
  ) {}
}
