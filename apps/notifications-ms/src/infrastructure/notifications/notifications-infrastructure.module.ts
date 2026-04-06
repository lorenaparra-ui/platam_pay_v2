import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EMAIL_SENDER_PORT } from '@modules/notifications/domain/ports/email-sender.port';
import { TWILIO_MESSAGING_PORT } from '@modules/notifications/domain/ports/twilio-messaging.port';
import { ResendEmailAdapter } from './resend-email.adapter';
import { TwilioMessagingAdapter } from './twilio-messaging.adapter';

@Module({
  imports: [ConfigModule],
  providers: [
    ResendEmailAdapter,
    {
      provide: EMAIL_SENDER_PORT,
      useExisting: ResendEmailAdapter,
    },
    TwilioMessagingAdapter,
    {
      provide: TWILIO_MESSAGING_PORT,
      useExisting: TwilioMessagingAdapter,
    },
  ],
  exports: [EMAIL_SENDER_PORT, TWILIO_MESSAGING_PORT],
})
export class NotificationsInfrastructureModule {}
