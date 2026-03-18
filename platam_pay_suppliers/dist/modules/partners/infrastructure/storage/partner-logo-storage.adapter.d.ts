import type { PartnerLogoStoragePort, UploadLogoPayload, UploadLogoResult } from "../../domain/ports/partner-logo-storage.port";
export declare const FILE_UPLOADER = "FILE_UPLOADER";
export interface FileUploader {
    upload(payload: {
        key: string;
        body: Buffer | Uint8Array;
        content_type?: string;
    }): Promise<{
        key: string;
        location: string;
    }>;
}
export declare class PartnerLogoStorageAdapter implements PartnerLogoStoragePort {
    private readonly uploader;
    private readonly logger;
    constructor(uploader: FileUploader);
    upload(payload: UploadLogoPayload): Promise<UploadLogoResult>;
}
