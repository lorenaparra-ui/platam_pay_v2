import { Inject, Injectable } from '@nestjs/common';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import {
  TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT,
  type TransversalOutboundQueueUrlPort,
} from '@messaging/domain/ports/transversal-outbound-queue-url.port';

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
    @Inject(TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT)
    private readonly outbound_queue_url: TransversalOutboundQueueUrlPort,
  ) {}

  async execute(command: PublishFilesUploadedCommand): Promise<void> {
    const queue_url = this.outbound_queue_url.get_outbound_queue_url();
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
