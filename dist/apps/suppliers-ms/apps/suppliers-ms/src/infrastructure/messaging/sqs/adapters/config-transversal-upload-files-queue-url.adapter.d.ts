import { type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalUploadFilesQueueUrlPort } from '@messaging/domain/ports/transversal-upload-files-queue-url.port';
export declare class ConfigTransversalUploadFilesQueueUrlAdapter implements TransversalUploadFilesQueueUrlPort {
    private readonly queues_config;
    constructor(queues_config: SqsQueuesUrlsConfig);
    get_upload_files_queue_url(): string | undefined;
}
