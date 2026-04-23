import { Inject, Injectable } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import type { TransversalFilesUploadedPublishQueueUrlPort } from '@messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port';

@Injectable()
export class ConfigTransversalFilesUploadedPublishQueueUrlAdapter
  implements TransversalFilesUploadedPublishQueueUrlPort
{
  constructor(@Inject(QUEUES_CONFIG) private readonly queues_config: SqsQueuesUrlsConfig) {}

  get_publish_queue_url(): string {
    const trim = (v: string | undefined): string | undefined => {
      if (v === undefined) {
        return undefined;
      }
      const t = v.trim();
      return t.length > 0 ? t : undefined;
    };
    const url =
      trim(this.queues_config.suppliers_callback_queue_url) ??
      trim(this.queues_config.inbound_queue_url) ??
      this.queues_config.outbound_queue_url.trim();
    return url;
  }
}
