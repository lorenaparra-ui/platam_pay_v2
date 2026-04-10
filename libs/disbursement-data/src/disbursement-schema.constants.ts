/** Nombre del esquema PostgreSQL para el bounded context de desembolsos. */
export const DISBURSEMENT_SCHEMA = 'disbursement_schema' as const;

export type DisbursementSchemaName = typeof DISBURSEMENT_SCHEMA;
