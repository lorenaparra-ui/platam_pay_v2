export class CreatePersonRequest {
  constructor(
    readonly country_code: string | null,
    readonly first_name: string,
    readonly last_name: string,
    readonly doc_type: string,
    readonly doc_number: string,
    readonly doc_issue_date: Date | null,
    readonly birth_date: Date | null,
    readonly gender: string | null,
    readonly phone: string | null,
    readonly residential_address: string | null,
    readonly business_address: string | null,
    readonly city_external_id: string | null,
  ) {}
}
