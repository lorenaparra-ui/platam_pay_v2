import { Module } from '@nestjs/common';
import { NotificationsApplicationModule } from '@modules/notifications/notifications-application.module';
import { IngestNotificationSqsMessageUseCase } from './application/use-cases/ingest-notification-sqs-message.use-case';

@Module({
  imports: [NotificationsApplicationModule],
  providers: [IngestNotificationSqsMessageUseCase],
  exports: [IngestNotificationSqsMessageUseCase],
})
export class MessagingApplicationModule {}
