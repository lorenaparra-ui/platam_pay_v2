export class Supplier {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly business_id: number,
    readonly bank_account_id: number | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateSupplierProps {
  business_id: number;
  bank_account_id: number | null;
}

export type UpdateSupplierProps = {
  bank_account_id?: number | null;
};
