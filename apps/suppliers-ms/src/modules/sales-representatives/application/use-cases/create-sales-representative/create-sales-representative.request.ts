export class CreateSalesRepresentativeRequest {
  constructor(
    readonly partnerExternalId: string,
    readonly userExternalId: string | null | undefined,
  ) {}
}
