export class CreateLegalRepresentativeRequest {
  constructor(
    readonly person_internal_id: number,
    readonly is_primary: boolean,
    readonly business_internal_id: number,
  ) {}
}
