import { Module } from '@nestjs/common';
import { ContractsApplicationModule } from '@modules/contracts/contracts-application.module';
import { IngestContractsCreateSqsMessageUseCase } from './application/use-cases/ingest-contracts-create-sqs-message.use-case';
import { IngestContractsGetSqsMessageUseCase } from './application/use-cases/ingest-contracts-get-sqs-message.use-case';

@Module({
  imports: [ContractsApplicationModule],
  providers: [IngestContractsCreateSqsMessageUseCase, IngestContractsGetSqsMessageUseCase],
  exports: [IngestContractsCreateSqsMessageUseCase, IngestContractsGetSqsMessageUseCase],
})
export class MessagingApplicationModule {}
