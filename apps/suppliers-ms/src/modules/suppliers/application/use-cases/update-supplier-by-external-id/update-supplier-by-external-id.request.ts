export class UpdateSupplierByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly bank_account_external_id: string | null | undefined,
  ) {}
}
