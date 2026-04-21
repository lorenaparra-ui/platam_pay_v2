import { Module } from '@nestjs/common';
import { PublishTransversalEventUseCase } from './application/use-cases/publish-transversal-event.use-case';
import { PublishUploadFilesEventUseCase } from './application/use-cases/publish-upload-files-event.use-case';
import { PublishCreatePartnerUserCommandUseCase } from './application/use-cases/publish-create-partner-user-command.use-case';
import { PublishCreatePersonCommandUseCase } from './application/use-cases/publish-create-person-command.use-case';
import { PublishCreateCreditFacilityCommandUseCase } from './application/use-cases/publish-create-credit-facility-command.use-case';
import { PublishCreateCategoriesCommandUseCase } from './application/use-cases/publish-create-categories-command.use-case';
import { ProcessTransversalInboundMessageUseCase } from './application/use-cases/process-transversal-inbound-message.use-case';
import { ProcessFilesUploadedInboundUseCase } from './application/use-cases/process-files-uploaded-inbound.use-case';
import { IngestTransversalInboundSqsMessageUseCase } from './application/use-cases/ingest-transversal-inbound-sqs-message.use-case';
import { FilesUploadedCorrelationAwaiter } from './application/services/files-uploaded-correlation-awaiter.service';
import { CreateBusinessForJobUseCase } from '@modules/businesses/application/use-cases/create-business-for-job/create-business-for-job.use-case';

@Module({
  providers: [
    FilesUploadedCorrelationAwaiter,
    PublishTransversalEventUseCase,
    PublishUploadFilesEventUseCase,
    PublishCreatePartnerUserCommandUseCase,
    PublishCreatePersonCommandUseCase,
    PublishCreateCreditFacilityCommandUseCase,
    PublishCreateCategoriesCommandUseCase,
    CreateBusinessForJobUseCase,
    ProcessTransversalInboundMessageUseCase,
    ProcessFilesUploadedInboundUseCase,
    IngestTransversalInboundSqsMessageUseCase,
  ],
  exports: [
    FilesUploadedCorrelationAwaiter,
    PublishTransversalEventUseCase,
    PublishUploadFilesEventUseCase,
    PublishCreatePartnerUserCommandUseCase,
    PublishCreatePersonCommandUseCase,
    PublishCreateCreditFacilityCommandUseCase,
    PublishCreateCategoriesCommandUseCase,
    CreateBusinessForJobUseCase,
    ProcessTransversalInboundMessageUseCase,
    ProcessFilesUploadedInboundUseCase,
    IngestTransversalInboundSqsMessageUseCase,
  ],
})
export class MessagingApplicationModule {}
