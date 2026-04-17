import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SQSClient } from '@aws-sdk/client-sqs';
import { IngestTransversalInboundSqsMessageUseCase } from '@messaging/application/use-cases/ingest-transversal-inbound-sqs-message.use-case';
import { BaseConsumer, type SqsQueuesUrlsConfig, type SqsReceivedMessage } from '@platam/shared';
export declare class TransversalInboundSqsConsumer extends BaseConsumer implements OnModuleInit, OnModuleDestroy {
    private readonly queues_config;
    private readonly config_service;
    private readonly ingest_transversal_inbound;
    private readonly nest_logger;
    constructor(sqs_client: SQSClient, queues_config: SqsQueuesUrlsConfig, config_service: ConfigService, ingest_transversal_inbound: IngestTransversalInboundSqsMessageUseCase);
    onModuleInit(): void;
    onModuleDestroy(): void;
    protected resolve_queue_url(): string | undefined;
    protected get_poll_settings(): {
        wait_time_seconds: number;
        max_number_of_messages: number;
        visibility_timeout_seconds: number;
    };
    protected inactive_reason_message(): string;
    protected handle(message: SqsReceivedMessage): Promise<boolean>;
}
