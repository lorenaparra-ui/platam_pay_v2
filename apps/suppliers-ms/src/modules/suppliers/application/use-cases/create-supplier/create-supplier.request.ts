export class CreateSupplierRequest {
  constructor(
    readonly business_internal_id: number,
    readonly bank_account_internal_id: number | null,
  ) {}
}
