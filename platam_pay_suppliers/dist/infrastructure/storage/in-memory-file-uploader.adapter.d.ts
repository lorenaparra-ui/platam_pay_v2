import type { FileUploader } from "@infrastructure/storage/file-uploader.port";
export declare class InMemoryFileUploaderAdapter implements FileUploader {
    private readonly logger;
    upload(payload: {
        key: string;
        body: Buffer | Uint8Array;
        content_type?: string;
    }): Promise<{
        key: string;
        location: string;
    }>;
}
