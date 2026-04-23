import { Module } from '@nestjs/common';
import { NotificationsInfrastructureModule } from '@infrastructure/notifications/notifications-infrastructure.module';
import { DispatchNotificationUseCase } from './application/use-cases/dispatch-notification.use-case';

@Module({
  imports: [NotificationsInfrastructureModule],
  providers: [DispatchNotificationUseCase],
  exports: [DispatchNotificationUseCase],
})
export class NotificationsApplicationModule {}
