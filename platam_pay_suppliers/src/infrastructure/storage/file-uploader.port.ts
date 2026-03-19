/**
 * Contrato técnico para almacenamiento de blobs (S3, GCS, stub en memoria, etc.).
 */

export const FILE_UPLOADER = "FILE_UPLOADER";

export interface FileUploader {
  upload(payload: {
    key: string;
    body: Buffer | Uint8Array;
    content_type?: string;
  }): Promise<{ key: string; location: string }>;
}
