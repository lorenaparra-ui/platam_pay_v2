export type UpdateContractCommand = Readonly<{
  application_external_id?: string | null;
  contract_template_external_id?: string | null;
  status_external_id?: string;
  zapsign_token?: string | null;
  original_file_url?: string | null;
  signed_file_url?: string | null;
  form_answers_json?: Record<string, unknown> | null;
}>;
