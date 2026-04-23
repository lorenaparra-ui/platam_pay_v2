import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import type {
  EmailSendRequest,
  EmailSenderPort,
} from '@modules/notifications/domain/ports/email-sender.port';

@Injectable()
export class ResendEmailAdapter implements EmailSenderPort {
  private readonly logger = new Logger(ResendEmailAdapter.name);

  constructor(private readonly config_service: ConfigService) {}

  async send(request: EmailSendRequest): Promise<void> {
    const api_key = this.config_service.get<string>('notifications.resend_api_key') ?? '';
    if (!api_key) {
      throw new Error('RESEND_API_KEY no configurada');
    }
    const default_from =
      this.config_service.get<string>('notifications.email_from_default') ?? '';
    const from = (request.from_override ?? default_from).trim();
    if (!from) {
      throw new Error('NOTIFICATIONS_EMAIL_FROM no configurada y sin fromOverride en el mensaje');
    }

    const resend = new Resend(api_key);
    const html = request.html?.trim() ?? '';
    const text = request.text?.trim() ?? '';

    const { error } =
      html.length > 0
        ? await resend.emails.send({
            from,
            to: [...request.to],
            subject: request.subject,
            html,
            reply_to: 'info@platam.co',
            ...(text.length > 0 ? { text } : {}),
          })
        : await resend.emails.send({
            from,
            to: [...request.to],
            subject: request.subject,
            text,
            reply_to: 'info@platam.co',
          });

    if (error) {
      this.logger.error(
        `[Resend][step=send_failed][name=${error.name ?? 'unknown'}]`,
      );
      throw new Error(error.message);
    }
  }
}
