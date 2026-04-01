export class LegalRepresentative {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly person_id: number,
    readonly is_primary: boolean,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateLegalRepresentativeProps {
  person_id: number;
  is_primary: boolean;
}
