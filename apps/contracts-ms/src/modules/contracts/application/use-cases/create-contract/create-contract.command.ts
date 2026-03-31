export type CreateContractCommand = Readonly<{
  external_id?: string;
  user_external_id: string;
  application_external_id?: string;
  status_external_id: string;
  zapsign_token?: string | null;
  original_file_url?: string | null;
  signed_file_url?: string | null;
  form_answers_json?: Record<string, unknown> | null;
}>;
