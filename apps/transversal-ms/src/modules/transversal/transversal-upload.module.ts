import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { UploadFilesUseCase } from './application/use-cases/upload-files/upload-files.use-case';
import { IngestUploadFilesSqsMessageUseCase } from './application/use-cases/ingest-upload-files-sqs-message.use-case';

@Module({
  imports: [ConfigModule, MessagingApplicationModule],
  providers: [UploadFilesUseCase, IngestUploadFilesSqsMessageUseCase],
  exports: [IngestUploadFilesSqsMessageUseCase, UploadFilesUseCase],
})
export class TransversalUploadModule {}
