export type SqsReceivedMessage = Readonly<{
    body: string;
    receipt_handle: string;
    message_id?: string;
}>;
