export const PRODUCTS_CREDIT_FACILITY_SYNC_PORT = Symbol(
  'PRODUCTS_CREDIT_FACILITY_SYNC_PORT',
);

export interface ProductsCreditFacilitySyncPort {
  /**
   * Inserta fila en products_schema.credit_facilities con external_id fijo (saga síncrona).
   * Idempotente si ya existe el external_id (no lanza).
   */
  ensure_credit_facility(input: Readonly<{
    credit_facility_external_id: string;
    contract_id: string | null;
    total_limit: string;
    status_external_id: string;
  }>): Promise<void>;
}
