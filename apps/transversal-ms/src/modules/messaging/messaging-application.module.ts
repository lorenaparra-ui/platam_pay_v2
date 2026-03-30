import { Module } from '@nestjs/common';
import { PublishTransversalEventUseCase } from './application/use-cases/publish-transversal-event.use-case';
import { PublishFilesUploadedEventUseCase } from './application/use-cases/publish-files-uploaded-event.use-case';
import { ProcessTransversalInboundMessageUseCase } from './application/use-cases/process-transversal-inbound-message.use-case';
import { IngestTransversalInboundSqsMessageUseCase } from './application/use-cases/ingest-transversal-inbound-sqs-message.use-case';

@Module({
  providers: [
    PublishTransversalEventUseCase,
    PublishFilesUploadedEventUseCase,
    ProcessTransversalInboundMessageUseCase,
    IngestTransversalInboundSqsMessageUseCase,
  ],
  exports: [
    PublishTransversalEventUseCase,
    PublishFilesUploadedEventUseCase,
    ProcessTransversalInboundMessageUseCase,
    IngestTransversalInboundSqsMessageUseCase,
  ],
})
export class MessagingApplicationModule {}
