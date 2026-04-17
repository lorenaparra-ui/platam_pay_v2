import { type SQSClient, type SendMessageCommandInput } from '@aws-sdk/client-sqs';
export declare abstract class BaseSqsPublisher {
    protected readonly sqs_client: SQSClient;
    constructor(sqs_client: SQSClient);
    protected enrich_send_input(input: SendMessageCommandInput): SendMessageCommandInput;
    protected send_message(input: SendMessageCommandInput): Promise<void>;
}
export { BaseSqsPublisher as BasePublisher };
