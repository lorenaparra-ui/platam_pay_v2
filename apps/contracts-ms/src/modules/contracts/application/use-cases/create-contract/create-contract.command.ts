export type CreateContractCommand = Readonly<{
  external_id?: string;
  /** Si se omite, el contrato se crea sin titular en users (p. ej. firma previa a alta). */
  user_external_id?: string;
  application_external_id?: string;
  /** Si se omite, se usa la plantilla semilla `legacy_default` v1 (post-migración). */
  contract_template_external_id?: string;
  status_external_id: string;
  zapsign_token?: string | null;
  original_file_url?: string | null;
  signed_file_url?: string | null;
  form_answers_json?: Record<string, unknown> | null;
}>;
