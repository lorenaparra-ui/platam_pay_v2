export class Business {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly person_id: number,
    readonly city_id: number | null,
    readonly entity_type: string,
    readonly business_name: string | null,
    readonly business_address: string | null,
    readonly business_type: string | null,
    readonly relationship_to_business: string | null,
    readonly legal_name: string | null,
    readonly trade_name: string | null,
    readonly tax_id: string | null,
    readonly year_of_establishment: number | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateBusinessProps {
  person_id: number;
  city_id: number | null;
  entity_type: string;
  business_name: string | null;
  business_address: string | null;
  business_type: string | null;
  relationship_to_business: string | null;
  legal_name: string | null;
  trade_name: string | null;
  tax_id: string | null;
  year_of_establishment: number | null;
}

export type UpdateBusinessProps = Partial<CreateBusinessProps>;
