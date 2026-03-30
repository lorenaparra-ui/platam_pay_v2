export interface CurrencyReadPort {
  find_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  find_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;
}
