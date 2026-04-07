export class CreateSalesRepresentativeRequest {
  constructor(
    readonly partner_external_id: string,
    readonly user_external_id: string | null | undefined,
  ) {}
}
