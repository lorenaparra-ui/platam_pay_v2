export const USER_REFERENCE_LOOKUP = Symbol('USER_REFERENCE_LOOKUP');

export interface UserReferenceLookupPort {
  get_role_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_role_external_id_by_internal_id(
    internal_id: number | null,
  ): Promise<string | null>;

  get_status_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_status_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;
}
