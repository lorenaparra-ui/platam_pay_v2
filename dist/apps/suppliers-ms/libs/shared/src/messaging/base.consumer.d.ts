import { type SQSClient } from '@aws-sdk/client-sqs';
import type { SqsReceivedMessage } from './sqs-message.interface';
export type SqsPollSettings = Readonly<{
    wait_time_seconds: number;
    max_number_of_messages: number;
    visibility_timeout_seconds: number;
}>;
export type MinimalLogger = Readonly<{
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}>;
export declare abstract class BaseSqsConsumer {
    protected readonly sqs_client: SQSClient;
    protected readonly logger: MinimalLogger;
    private stopped;
    private poll_promise;
    constructor(sqs_client: SQSClient, logger: MinimalLogger);
    start(): void;
    stop(): void;
    protected abstract resolve_queue_url(): string | undefined;
    protected abstract get_poll_settings(): SqsPollSettings;
    protected abstract handle(message: SqsReceivedMessage): Promise<boolean>;
    protected inactive_reason_message(): string;
    protected active_log_message(queue_url: string): string;
    private poll_loop;
    private process_one;
}
export { BaseSqsConsumer as BaseConsumer };
