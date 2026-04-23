export const CREDIT_APPLICATION_DOCUMENT_STORAGE = Symbol('CREDIT_APPLICATION_DOCUMENT_STORAGE');

export interface UploadDocumentParams {
  credit_application_external_id: string;
  document_type: string;
  file_name: string;
  mime_type: string;
  content_base64: string;
}

export interface UploadDocumentResult {
  document_id: string;
  url: string;
}

export interface CreditApplicationDocumentStoragePort {
  upload(params: UploadDocumentParams): Promise<UploadDocumentResult>;
}
