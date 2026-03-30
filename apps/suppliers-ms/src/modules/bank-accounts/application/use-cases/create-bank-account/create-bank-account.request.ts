export class CreateBankAccountRequest {
  constructor(
    readonly bank_entity: string,
    readonly account_number: string,
    readonly bank_certification: string | null,
  ) {}
}
