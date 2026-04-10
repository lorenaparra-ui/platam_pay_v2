/** Esquema PostgreSQL del bounded context de cobranza / collections. */
export const COLLECTIONS_SCHEMA = 'collections_schema' as const;

export type CollectionsSchemaName = typeof COLLECTIONS_SCHEMA;
