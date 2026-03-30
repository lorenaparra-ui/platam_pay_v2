export const PERSON_REFERENCE_LOOKUP = Symbol('PERSON_REFERENCE_LOOKUP');

export interface PersonReferenceLookupPort {
  get_user_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_user_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  get_city_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_city_external_id_by_internal_id(
    internal_id: number | null,
  ): Promise<string | null>;
}
