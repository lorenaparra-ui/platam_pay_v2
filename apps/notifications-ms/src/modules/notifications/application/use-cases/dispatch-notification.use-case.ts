import { Inject, Injectable, Logger } from '@nestjs/common';
import type { UseCase } from '@platam/shared';
import { NotificationChannel } from '@modules/notifications/domain/notification-channel.enum';
import type { EmailSenderPort } from '@modules/notifications/domain/ports/email-sender.port';
import { EMAIL_SENDER_PORT } from '@modules/notifications/domain/ports/email-sender.port';
import type { TwilioMessagingPort } from '@modules/notifications/domain/ports/twilio-messaging.port';
import { TWILIO_MESSAGING_PORT } from '@modules/notifications/domain/ports/twilio-messaging.port';
import type {
  EmailNotificationPayloadDto,
  SmsNotificationPayloadDto,
  WhatsappNotificationPayloadDto,
  WhatsappTemplateNotificationPayloadDto,
} from '@modules/notifications/application/dto/send-notification-payload.dto';

export type DispatchNotificationCommand = Readonly<{
  correlation_id: string;
  channel: NotificationChannel;
  payload:
    | EmailNotificationPayloadDto
    | SmsNotificationPayloadDto
    | WhatsappNotificationPayloadDto
    | WhatsappTemplateNotificationPayloadDto;
}>;

@Injectable()
export class DispatchNotificationUseCase implements UseCase<DispatchNotificationCommand, void> {
  private readonly logger = new Logger(DispatchNotificationUseCase.name);

  constructor(
    @Inject(EMAIL_SENDER_PORT) private readonly email_sender: EmailSenderPort,
    @Inject(TWILIO_MESSAGING_PORT) private readonly twilio: TwilioMessagingPort,
  ) {}

  async execute(command: DispatchNotificationCommand): Promise<void> {
    const { correlation_id, channel } = command;
    switch (channel) {
      case NotificationChannel.email: {
        const p = command.payload as EmailNotificationPayloadDto;
        await this.email_sender.send({
          to: p.to,
          subject: p.subject,
          html: p.html,
          text: p.text,
          from_override: p.from_override,
        });
        this.logger.log(
          `[Notify][correlationId=${correlation_id}][channel=email][step=sent][recipients=${p.to.length}]`,
        );
        return;
      }
      case NotificationChannel.sms:
        await this.twilio.send_sms({
          to_e164: (command.payload as SmsNotificationPayloadDto).to_e164,
          body: (command.payload as SmsNotificationPayloadDto).body,
        });
        this.logger.log(`[Notify][correlationId=${correlation_id}][channel=sms][step=sent]`);
        return;
      case NotificationChannel.whatsapp:
        await this.twilio.send_whatsapp({
          to_e164: (command.payload as WhatsappNotificationPayloadDto).to_e164,
          body: (command.payload as WhatsappNotificationPayloadDto).body,
        });
        this.logger.log(`[Notify][correlationId=${correlation_id}][channel=whatsapp][step=sent]`);
        return;
      case NotificationChannel.whatsapp_template: {
        const p = command.payload as WhatsappTemplateNotificationPayloadDto;
        await this.twilio.send_whatsapp_template({
          to_e164: p.to_e164,
          content_sid: p.content_sid,
          content_variables: p.content_variables,
        });
        this.logger.log(
          `[Notify][correlationId=${correlation_id}][channel=whatsapp_template][step=sent][sid=${p.content_sid}]`,
        );
        return;
      }
      default: {
        const _exhaustive: never = channel;
        void _exhaustive;
        throw new Error(`Canal no soportado: ${String(channel)}`);
      }
    }
  }
}
