import { ConfigService } from "@nestjs/config";
import type { FileStoragePort, UploadFilePayload, UploadFileResult } from "@partners/domain/ports/file-storage.port";
export declare class HttpFileStorageAdapter implements FileStoragePort {
    private readonly configService;
    private readonly logger;
    private readonly baseUrl;
    constructor(configService: ConfigService);
    upload(payload: UploadFilePayload): Promise<UploadFileResult>;
}
