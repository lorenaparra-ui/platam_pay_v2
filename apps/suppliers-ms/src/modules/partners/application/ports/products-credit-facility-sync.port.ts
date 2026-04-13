import type { CreditFacilityState } from '@platam/shared';

export const PRODUCTS_CREDIT_FACILITY_SYNC_PORT = Symbol(
  'PRODUCTS_CREDIT_FACILITY_SYNC_PORT',
);

export interface ProductsCreditFacilitySyncPort {
  /**
   * Inserta fila en products_schema.credit_facilities de forma síncrona.
   * Idempotente: si ya existe el external_id retorna el internal_id existente.
   * Retorna el id interno generado por la base de datos.
   */
  create_credit_facility(input: Readonly<{
    credit_facility_external_id: string;
    contract_id: string | null;
    total_limit: string;
    state: CreditFacilityState;
    /** FK interna `suppliers_schema.businesses.id`. */
    business_id: number;
  }>): Promise<{ internal_id: number }>;

  /**
   * Actualiza el estado de una facilidad de crédito existente.
   */
  update_credit_facility_state(
    credit_facility_external_id: string,
    state: CreditFacilityState,
  ): Promise<void>;
}
