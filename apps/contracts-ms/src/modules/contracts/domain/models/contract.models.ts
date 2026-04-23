import type { ContractCatalogStatus } from '@platam/shared';

export class Contract {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly user_id: number | null,
    readonly contract_template_id: number | null,
    readonly zapsign_token: string | null,
    readonly status: ContractCatalogStatus,
    readonly original_file_url: string | null,
    readonly signed_file_url: string | null,
    readonly form_answers_json: Record<string, unknown> | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

/** Propiedades persistidas en products_schema.contracts. */
export interface CreateContractProps {
  external_id?: string;
  user_id: number | null;
  contract_template_id: number | null;
  zapsign_token: string | null;
  status: ContractCatalogStatus;
  original_file_url: string | null;
  signed_file_url: string | null;
  form_answers_json: Record<string, unknown> | null;
}

/** Datos para crear contrato + enlace opcional a credit_applications (no columna en contracts). */
export interface CreateContractRepositoryInput extends CreateContractProps {
  credit_application_internal_id: number | null;
}

export type UpdateContractProps = Partial<
  Pick<
    CreateContractProps,
    | 'contract_template_id'
    | 'zapsign_token'
    | 'status'
    | 'original_file_url'
    | 'signed_file_url'
    | 'form_answers_json'
  >
> & {
  /** Si se envía, reescribe credit_applications.contract_id para esta instancia. */
  credit_application_internal_id?: number | null;
};

export type ListContractsFilters = Readonly<{
  user_id?: number;
  /** Filtra contratos vinculados a esta solicitud (credit_applications.id). */
  credit_application_internal_id?: number;
  status?: ContractCatalogStatus;
}>;
