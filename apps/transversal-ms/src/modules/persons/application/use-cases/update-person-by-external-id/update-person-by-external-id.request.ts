export class UpdatePersonByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly country_code: string | null | undefined,
    readonly first_name: string | undefined,
    readonly last_name: string | undefined,
    readonly doc_type: string | undefined,
    readonly doc_number: string | undefined,
    readonly doc_issue_date: Date | null | undefined,
    readonly birth_date: Date | null | undefined,
    readonly gender: string | null | undefined,
    readonly phone: string | null | undefined,
    readonly residential_address: string | null | undefined,
    readonly business_address: string | null | undefined,
    readonly city_external_id: string | null | undefined,
  ) {}
}
