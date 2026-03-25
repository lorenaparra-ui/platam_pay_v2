export const SIGNATURE_PROVIDER = Symbol("SIGNATURE_PROVIDER");

export interface SignatureReplacement {
  from: string;
  to: string;
}

export interface CreateSignatureDocumentInput {
  templateId: string;
  folderPath: string;
  sandbox: boolean;
  signerName: string;
  signerEmail: string;
  signerPhoneCountry: string;
  signerPhoneNumber: string;
  replacements: SignatureReplacement[];
}

export interface CreateSignatureDocumentResult {
  providerDocumentToken: string;
  originalFileUrl: string | null;
  signer: {
    providerSignerToken: string;
    signUrl: string | null;
  };
  rawResponse: Record<string, unknown>;
}

export interface SignatureWebhookNormalizedEvent {
  providerDocumentToken: string;
  providerSignerToken: string;
  signedAt: Date;
  signedFileUrl: string | null;
  signUrl: string | null;
  ipAddress: string | null;
  geoLatitude: string | null;
  geoLongitude: string | null;
  documentPhotoUrl: string | null;
  documentVersePhotoUrl: string | null;
  selfiePhotoUrl: string | null;
  signatureImageUrl: string | null;
  rawPayload: Record<string, unknown>;
}

export interface SignatureDocumentSnapshotSigner {
  providerSignerToken: string;
  signUrl: string | null;
  signedAt: Date | null;
  ipAddress: string | null;
  geoLatitude: string | null;
  geoLongitude: string | null;
  documentPhotoUrl: string | null;
  documentVersePhotoUrl: string | null;
  selfiePhotoUrl: string | null;
  signatureImageUrl: string | null;
}

export interface SignatureDocumentSnapshot {
  providerDocumentToken: string;
  documentStatus: string | null;
  signedFileUrl: string | null;
  signers: SignatureDocumentSnapshotSigner[];
  rawPayload: Record<string, unknown>;
}

export interface SignatureProviderPort {
  createDocumentFromTemplate(
    input: CreateSignatureDocumentInput,
  ): Promise<CreateSignatureDocumentResult>;
  cancelDocument(providerDocumentToken: string): Promise<void>;
  getDocumentSnapshot(
    providerDocumentToken: string,
  ): Promise<SignatureDocumentSnapshot | null>;
  normalizeSignedWebhook(
    payload: Record<string, unknown>,
  ): SignatureWebhookNormalizedEvent | null;
}
