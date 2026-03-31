export class Contract {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly user_id: number,
    readonly application_id: number | null,
    readonly zapsign_token: string | null,
    readonly status_id: number,
    readonly original_file_url: string | null,
    readonly signed_file_url: string | null,
    readonly form_answers_json: Record<string, unknown> | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateContractProps {
  external_id?: string;
  user_id: number;
  application_id: number | null;
  zapsign_token: string | null;
  status_id: number;
  original_file_url: string | null;
  signed_file_url: string | null;
  form_answers_json: Record<string, unknown> | null;
}

export type UpdateContractProps = Partial<
  Pick<
    CreateContractProps,
    | 'application_id'
    | 'zapsign_token'
    | 'status_id'
    | 'original_file_url'
    | 'signed_file_url'
    | 'form_answers_json'
  >
>;

export type ListContractsFilters = Readonly<{
  user_id?: number;
  application_id?: number;
  status_id?: number;
}>;
