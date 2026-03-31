export interface ContractReferenceLookupPort {
  get_user_internal_id_by_external_id(external_id: string): Promise<number | null>;

  get_application_internal_id_by_external_id(external_id: string): Promise<number | null>;

  get_contract_status_internal_id_by_external_id(external_id: string): Promise<number | null>;

  get_status_external_id_by_internal_id(internal_id: number): Promise<string | null>;
}

export const CONTRACT_REFERENCE_LOOKUP = Symbol('CONTRACT_REFERENCE_LOOKUP');
