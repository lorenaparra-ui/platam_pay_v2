import type { PartnerLogoStoragePort, UploadLogoPayload, UploadLogoResult } from "@partners/application/ports/partner-logo-storage.port";
import { type FileUploader } from "@infrastructure/storage/file-uploader.port";
export declare class PartnerLogoStorageAdapter implements PartnerLogoStoragePort {
    private readonly uploader;
    private readonly logger;
    constructor(uploader: FileUploader);
    upload(payload: UploadLogoPayload): Promise<UploadLogoResult>;
}
