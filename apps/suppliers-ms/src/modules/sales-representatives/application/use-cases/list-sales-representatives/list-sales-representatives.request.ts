export class ListSalesRepresentativesRequest {
  constructor(
    readonly partnerExternalId?: string,
    /** Si es `true`, el repositorio no filtra por `is_default = false`. */
    readonly includeDefaultRepresentatives?: boolean,
  ) {}
}
