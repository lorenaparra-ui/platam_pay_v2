export const SUPPLIERS_REFERENCE_LOOKUP = Symbol('SUPPLIERS_REFERENCE_LOOKUP');

export interface SuppliersReferenceLookupPort {
  get_user_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_person_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_city_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_business_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_partner_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_user_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  get_person_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  get_city_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  get_business_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  get_bank_account_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  get_bank_account_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_supplier_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;
}
