export class LegalRepresentative {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly business_id: number,
    readonly person_id: number,
    readonly is_primary: boolean,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateLegalRepresentativeProps {
  business_id: number;
  person_id: number;
  is_primary: boolean;
}
