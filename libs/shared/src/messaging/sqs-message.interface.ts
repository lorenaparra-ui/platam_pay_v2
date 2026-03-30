/**
 * Subconjunto del mensaje SQS relevante para procesamiento y control de visibilidad.
 */
export type SqsReceivedMessage = Readonly<{
  body: string;
  receipt_handle: string;
  message_id?: string;
}>;
