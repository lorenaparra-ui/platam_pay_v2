import type { ContractCatalogStatus } from '@platam/shared';

export interface ContractReferenceLookupPort {
  get_user_internal_id_by_external_id(external_id: string): Promise<number | null>;

  get_application_internal_id_by_external_id(external_id: string): Promise<number | null>;

  get_contract_catalog_status_by_external_id(
    external_id: string,
  ): Promise<ContractCatalogStatus | null>;

  get_contract_status_external_id_by_catalog_status(
    status: ContractCatalogStatus,
  ): Promise<string | null>;

  get_contract_template_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  get_default_contract_template_internal_id(): Promise<number | null>;

  get_contract_template_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  /** Referencia de plantilla en ZapSign (`contract_templates.zapsign_template_ref`). */
  get_zapsign_template_ref_by_internal_id(
    template_internal_id: number,
  ): Promise<string | null>;
}

export const CONTRACT_REFERENCE_LOOKUP = Symbol('CONTRACT_REFERENCE_LOOKUP');
