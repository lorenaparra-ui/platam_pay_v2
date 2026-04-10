import type { SendMessageCommandInput } from '@aws-sdk/client-sqs';
import type { OutboundMessagePublisherPort, PublishOutboundMessageCommand } from '@messaging/domain/ports/outbound-message-publisher.port';
import { BasePublisher } from '@platam/shared';
import type { SQSClient } from '@aws-sdk/client-sqs';
export declare class SqsMessagePublisherAdapter extends BasePublisher implements OutboundMessagePublisherPort {
    constructor(sqs_client: SQSClient);
    protected enrich_send_input(input: SendMessageCommandInput): SendMessageCommandInput;
    publish(command: PublishOutboundMessageCommand): Promise<void>;
}
