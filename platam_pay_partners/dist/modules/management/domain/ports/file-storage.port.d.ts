export declare const FILE_STORAGE_PORT = "FILE_STORAGE_PORT";
export interface UploadFilePayload {
    key: string;
    body: Buffer | Uint8Array;
    content_type?: string;
    metadata?: Record<string, string>;
}
export interface UploadFileResult {
    key: string;
    location: string;
}
export interface FileStoragePort {
    upload(payload: UploadFilePayload): Promise<UploadFileResult>;
}
