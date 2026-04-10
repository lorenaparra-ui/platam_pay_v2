export declare const OUTBOUND_MESSAGE_PUBLISHER_PORT: unique symbol;
export type OutboundMessageAttributeValue = Readonly<{
    data_type: 'String' | 'Number';
    string_value: string;
}>;
export type PublishOutboundMessageCommand = Readonly<{
    queue_url: string;
    body: string;
    message_attributes?: Readonly<Record<string, OutboundMessageAttributeValue>>;
    message_group_id?: string;
    message_deduplication_id?: string;
}>;
export interface OutboundMessagePublisherPort {
    publish(command: PublishOutboundMessageCommand): Promise<void>;
}
