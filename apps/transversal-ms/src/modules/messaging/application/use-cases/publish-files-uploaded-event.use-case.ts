import { Inject, Injectable } from '@nestjs/common';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT,
  type TransversalFilesUploadedPublishQueueUrlPort,
} from '@messaging/domain/ports/transversal-files-uploaded-publish-queue-url.port';

export type PublishFilesUploadedCommand = Readonly<{
  correlation_id: string;
  files: ReadonlyArray<Readonly<{ url: string; folder: string }>>;
}>;

/**
 * Publica el evento files-uploaded (contrato camelCase en cola saliente).
 */
@Injectable()
export class PublishFilesUploadedEventUseCase {
  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly message_publisher: OutboundMessagePublisherPort,
    @Inject(TRANSVERSAL_FILES_UPLOADED_PUBLISH_QUEUE_URL_PORT)
    private readonly files_upload_publish_queue: TransversalFilesUploadedPublishQueueUrlPort,
  ) {}

  async execute(command: PublishFilesUploadedCommand): Promise<void> {
    const queue_url = this.files_upload_publish_queue.get_publish_queue_url();
    const body = JSON.stringify({
      event: 'files-uploaded',
      correlationId: command.correlation_id,
      payload: {
        files: command.files.map((f) => ({
          url: f.url,
          folder: f.folder,
        })),
      },
    });

    await this.message_publisher.publish({ queue_url, body });
  }
}
