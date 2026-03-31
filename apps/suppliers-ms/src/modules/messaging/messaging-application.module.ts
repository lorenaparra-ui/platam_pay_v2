import { Module } from '@nestjs/common';
import { PublishTransversalEventUseCase } from './application/use-cases/publish-transversal-event.use-case';
import { PublishUploadFilesEventUseCase } from './application/use-cases/publish-upload-files-event.use-case';
import { PublishCreatePartnerUserCommandUseCase } from './application/use-cases/publish-create-partner-user-command.use-case';
import { ProcessTransversalInboundMessageUseCase } from './application/use-cases/process-transversal-inbound-message.use-case';
import { ProcessFilesUploadedInboundUseCase } from './application/use-cases/process-files-uploaded-inbound.use-case';
import { IngestTransversalInboundSqsMessageUseCase } from './application/use-cases/ingest-transversal-inbound-sqs-message.use-case';
import { FilesUploadedCorrelationAwaiter } from './application/services/files-uploaded-correlation-awaiter.service';

@Module({
  providers: [
    FilesUploadedCorrelationAwaiter,
    PublishTransversalEventUseCase,
    PublishUploadFilesEventUseCase,
    PublishCreatePartnerUserCommandUseCase,
    ProcessTransversalInboundMessageUseCase,
    ProcessFilesUploadedInboundUseCase,
    IngestTransversalInboundSqsMessageUseCase,
  ],
  exports: [
    FilesUploadedCorrelationAwaiter,
    PublishTransversalEventUseCase,
    PublishUploadFilesEventUseCase,
    PublishCreatePartnerUserCommandUseCase,
    ProcessTransversalInboundMessageUseCase,
    ProcessFilesUploadedInboundUseCase,
    IngestTransversalInboundSqsMessageUseCase,
  ],
})
export class MessagingApplicationModule {}
