/**
 * Puerto de aplicación (salida): publicar mensajes en una cola sin acoplarse a AWS ni a SQS.
 */

export const OUTBOUND_MESSAGE_PUBLISHER_PORT = Symbol('OUTBOUND_MESSAGE_PUBLISHER_PORT');
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
