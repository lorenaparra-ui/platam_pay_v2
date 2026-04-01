export class CreateLegalRepresentativeRequest {
  constructor(
    readonly person_internal_id: number,
    readonly is_primary: boolean,
    readonly supplier_internal_id: number | null,
  ) {}
}
