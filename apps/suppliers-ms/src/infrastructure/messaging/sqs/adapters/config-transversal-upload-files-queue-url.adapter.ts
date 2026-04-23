import { Inject, Injectable } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalUploadFilesQueueUrlPort } from '@messaging/domain/ports/transversal-upload-files-queue-url.port';

@Injectable()
export class ConfigTransversalUploadFilesQueueUrlAdapter implements TransversalUploadFilesQueueUrlPort {
  constructor(@Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig) {}

  get_upload_files_queue_url(): string | undefined {
    return this.queues_config.upload_files_queue_url;
  }
}
