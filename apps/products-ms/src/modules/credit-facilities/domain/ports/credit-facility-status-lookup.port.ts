export const CREDIT_FACILITY_STATUS_LOOKUP = Symbol(
  'CREDIT_FACILITY_STATUS_LOOKUP',
);

export interface CreditFacilityStatusLookupPort {
  get_status_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_status_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;
}
