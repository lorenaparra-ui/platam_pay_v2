export const PRODUCTS_REFERENCE_LOOKUP = Symbol('PRODUCTS_REFERENCE_LOOKUP');

/**
 * Resolución de identificadores externos ↔ internos para catálogo products-ms
 * (facilidades, partners en suppliers_schema).
 */
export interface ProductsReferenceLookupPort {
  get_credit_facility_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_credit_facility_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  get_partner_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;
}
