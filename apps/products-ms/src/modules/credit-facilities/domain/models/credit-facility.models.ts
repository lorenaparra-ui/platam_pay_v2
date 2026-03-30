export class CreditFacility {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly contract_id: string | null,
    readonly status_id: number,
    readonly total_limit: string,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateCreditFacilityProps {
  /** Si se informa, se usa como external_id (idempotencia / saga orquestada). */
  external_id?: string;
  contract_id: string | null;
  status_id: number;
  total_limit: string;
}

export type UpdateCreditFacilityProps = Partial<CreateCreditFacilityProps>;
