import { SQSClient, type SQSClientConfig } from '@aws-sdk/client-sqs';
export type CreateSqsClientOptions = Readonly<{
    region: string;
    endpoint?: string;
    credentials?: SQSClientConfig['credentials'];
    use_queue_url_as_endpoint?: boolean;
}>;
export declare function create_sqs_client(options: CreateSqsClientOptions): SQSClient;
