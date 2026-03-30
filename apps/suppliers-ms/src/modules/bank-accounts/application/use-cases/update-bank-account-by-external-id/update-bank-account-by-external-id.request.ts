export class UpdateBankAccountByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly bank_entity: string | undefined,
    readonly account_number: string | undefined,
    readonly bank_certification: string | null | undefined,
  ) {}
}
