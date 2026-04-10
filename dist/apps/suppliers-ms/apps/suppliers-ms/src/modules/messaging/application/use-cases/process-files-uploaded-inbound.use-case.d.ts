import type { UseCase } from '@platam/shared';
import { FilesUploadedInboundDto } from '../dto/files-uploaded-inbound.dto';
import { FilesUploadedCorrelationAwaiter } from '../services/files-uploaded-correlation-awaiter.service';
export declare class ProcessFilesUploadedInboundUseCase implements UseCase<FilesUploadedInboundDto, void> {
    private readonly awaiter;
    private readonly logger;
    constructor(awaiter: FilesUploadedCorrelationAwaiter);
    execute(dto: FilesUploadedInboundDto): Promise<void>;
    private map_payload_to_legacy_urls;
}
