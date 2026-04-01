export class CreateLegalRepresentativeRequest {
  constructor(
    readonly person_external_id: string,
    readonly is_primary: boolean,
  ) {}
}
