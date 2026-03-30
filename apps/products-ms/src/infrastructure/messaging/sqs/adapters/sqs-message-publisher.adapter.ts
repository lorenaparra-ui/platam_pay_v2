import { Inject, Injectable } from '@nestjs/common';
import type { SendMessageCommandInput } from '@aws-sdk/client-sqs';
import type {
  OutboundMessageAttributeValue,
  OutboundMessagePublisherPort,
  PublishOutboundMessageCommand,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import { BasePublisher, SQS_CLIENT } from '@platam/shared';
import type { SQSClient } from '@aws-sdk/client-sqs';

type CorrelationMessageBody = Readonly<{
  correlation_id?: string;
}>;

@Injectable()
export class SqsMessagePublisherAdapter extends BasePublisher implements OutboundMessagePublisherPort {
  constructor(@Inject(SQS_CLIENT) sqs_client: SQSClient) {
    super(sqs_client);
  }

  /**
   * Colas FIFO: un grupo por `correlation_id` mantiene orden por flujo de negocio.
   */
  protected enrich_send_input(input: SendMessageCommandInput): SendMessageCommandInput {
    if (input.MessageGroupId) {
      return input;
    }
    try {
      const parsed = JSON.parse(input.MessageBody ?? '{}') as CorrelationMessageBody;
      const group = parsed.correlation_id;
      if (typeof group === 'string' && group.length > 0) {
        return { ...input, MessageGroupId: group };
      }
    } catch {
      // cuerpo no JSON; se envía sin grupo (válido en colas estándar)
    }
    return input;
  }

  async publish(command: PublishOutboundMessageCommand): Promise<void> {
    const message_attributes = command.message_attributes
      ? Object.fromEntries(
          (
            Object.entries(command.message_attributes) as [string, OutboundMessageAttributeValue][]
          ).map(([key, attr]) => [
            key,
            {
              DataType: attr.data_type,
              StringValue: attr.string_value,
            },
          ]),
        )
      : undefined;

    await this.send_message({
      QueueUrl: command.queue_url,
      MessageBody: command.body,
      MessageAttributes: message_attributes,
      MessageGroupId: command.message_group_id,
      MessageDeduplicationId: command.message_deduplication_id,
    });
  }
}
