export const PARTNER_SAGA_COMPENSATION_PORT = Symbol('PARTNER_SAGA_COMPENSATION_PORT');

/**
 * Puerto de compensación de la saga de onboarding de partners.
 * Agrupa las operaciones de rollback necesarias para deshacer cada paso
 * en caso de fallo, siguiendo el patrón Saga con transacciones compensatorias.
 *
 * El orden de llamada debe ser inverso al de creación.
 */
export interface PartnerSagaCompensationPort {
  /** Paso 9 / Paso 1 — elimina la credit_facility creada en products_schema */
  delete_credit_facility(credit_facility_external_id: string): Promise<void>;

  /** Paso 7 — elimina el partner creado */
  delete_partner(partner_external_id: string): Promise<void>;

  /** Paso 5 — elimina el supplier creado */
  delete_supplier(supplier_external_id: string): Promise<void>;

  /** Paso 4 — elimina el business creado */
  delete_business(business_external_id: string): Promise<void>;

  /** Paso 2 — elimina la cuenta bancaria creada */
  delete_bank_account(bank_account_external_id: string): Promise<void>;
}
