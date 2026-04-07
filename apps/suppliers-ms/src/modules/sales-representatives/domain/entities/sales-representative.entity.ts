export class SalesRepresentative {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly partner_id: number,
    readonly user_id: number | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateSalesRepresentativeProps {
  partner_id: number;
  user_id: number | null;
}
