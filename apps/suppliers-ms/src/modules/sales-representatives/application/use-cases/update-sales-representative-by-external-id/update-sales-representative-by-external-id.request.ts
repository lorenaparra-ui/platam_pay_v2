export class UpdateSalesRepresentativeUserByExternalIdRequest {
  constructor(
    readonly externalId: string,
    /** `undefined` = no operación; `null` = desvincular usuario; string = UUID de usuario */
    readonly userExternalId: string | null | undefined,
  ) {}
}
