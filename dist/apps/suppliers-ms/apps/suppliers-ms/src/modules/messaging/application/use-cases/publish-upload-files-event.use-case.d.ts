import { ConfigService } from '@nestjs/config';
import { type OutboundMessagePublisherPort } from '@messaging/domain/ports/outbound-message-publisher.port';
import { type TransversalUploadFilesQueueUrlPort } from '@messaging/domain/ports/transversal-upload-files-queue-url.port';
export type PublishUploadFilesCommand = Readonly<{
    correlation_id: string;
    idempotency_key: string;
    files: Readonly<{
        bank_certification?: string;
        logo?: string;
        co_branding?: string;
    }>;
    file_folders?: Readonly<{
        bank_certification?: string;
        logo?: string;
        co_branding?: string;
    }>;
}>;
export declare class PublishUploadFilesEventUseCase {
    private readonly message_publisher;
    private readonly upload_queue_url;
    private readonly config_service;
    constructor(message_publisher: OutboundMessagePublisherPort, upload_queue_url: TransversalUploadFilesQueueUrlPort, config_service: ConfigService);
    execute(command: PublishUploadFilesCommand): Promise<void>;
    private folder_for_slot;
}
