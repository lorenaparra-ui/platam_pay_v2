/**
 * Estado activo/inactivo compartido por facilidades de crédito, categorías y partners.
 * Valores alineados con ENUM PostgreSQL (`active` / `inactive`).
 */
export enum Statuses {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/** @deprecated Preferir `Statuses`; alias por compatibilidad con imports existentes. */
export { Statuses as CreditFacilitiesStatuses };
