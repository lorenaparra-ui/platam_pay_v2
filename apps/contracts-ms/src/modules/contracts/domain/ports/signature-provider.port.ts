export const SIGNATURE_PROVIDER = Symbol('SIGNATURE_PROVIDER');

export interface SignatureReplacement {
  readonly from: string;
  readonly to: string;
}

export interface CreateSignatureDocumentInput {
  readonly template_id: string;
  readonly folder_path: string;
  readonly sandbox: boolean;
  readonly signer_name: string;
  readonly signer_email: string;
  readonly signer_phone_country: string;
  readonly signer_phone_number: string;
  readonly replacements: readonly SignatureReplacement[];
}

export interface CreateSignatureDocumentResult {
  readonly provider_document_token: string;
  readonly original_file_url: string | null;
  readonly signer: {
    readonly provider_signer_token: string;
    readonly sign_url: string | null;
  };
  readonly raw_response: Record<string, unknown>;
}

export interface SignatureWebhookNormalizedEvent {
  readonly provider_document_token: string;
  readonly provider_signer_token: string;
  readonly signed_at: Date;
  readonly signed_file_url: string | null;
  readonly sign_url: string | null;
  readonly ip_address: string | null;
  readonly geo_latitude: string | null;
  readonly geo_longitude: string | null;
  readonly document_photo_url: string | null;
  readonly document_verse_photo_url: string | null;
  readonly selfie_photo_url: string | null;
  readonly signature_image_url: string | null;
  readonly raw_payload: Record<string, unknown>;
}

export interface SignatureDocumentSnapshotSigner {
  readonly provider_signer_token: string;
  readonly sign_url: string | null;
  readonly signed_at: Date | null;
  readonly ip_address: string | null;
  readonly geo_latitude: string | null;
  readonly geo_longitude: string | null;
  readonly document_photo_url: string | null;
  readonly document_verse_photo_url: string | null;
  readonly selfie_photo_url: string | null;
  readonly signature_image_url: string | null;
}

export interface SignatureDocumentSnapshot {
  readonly provider_document_token: string;
  readonly document_status: string | null;
  readonly signed_file_url: string | null;
  readonly signers: readonly SignatureDocumentSnapshotSigner[];
  readonly raw_payload: Record<string, unknown>;
}

export interface SignatureProviderPort {
  create_document_from_template(
    input: CreateSignatureDocumentInput,
  ): Promise<CreateSignatureDocumentResult>;

  cancel_document(provider_document_token: string): Promise<void>;

  get_document_snapshot(
    provider_document_token: string,
  ): Promise<SignatureDocumentSnapshot | null>;

  normalize_signed_webhook(
    payload: Record<string, unknown>,
  ): SignatureWebhookNormalizedEvent | null;
}
