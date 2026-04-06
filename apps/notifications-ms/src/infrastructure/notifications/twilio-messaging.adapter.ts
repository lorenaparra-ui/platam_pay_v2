import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import twilio from 'twilio';
import type {
  TwilioMessagingPort,
  TwilioSmsSendRequest,
  TwilioWhatsappSendRequest,
} from '@modules/notifications/domain/ports/twilio-messaging.port';

@Injectable()
export class TwilioMessagingAdapter implements TwilioMessagingPort {
  private readonly logger = new Logger(TwilioMessagingAdapter.name);

  constructor(private readonly config_service: ConfigService) {}

  async send_sms(request: TwilioSmsSendRequest): Promise<void> {
    const from = (this.config_service.get<string>('notifications.twilio_from_sms') ?? '').trim();
    if (!from) {
      throw new Error('TWILIO_FROM_SMS no configurado');
    }
    const client = this.create_client();
    try {
      await client.messages.create({
        body: request.body,
        from,
        to: request.to_e164,
      });
    } catch (err: unknown) {
      this.log_twilio_error('sms', err);
      throw err instanceof Error ? err : new Error(String(err));
    }
  }

  async send_whatsapp(request: TwilioWhatsappSendRequest): Promise<void> {
    const from_raw = (
      this.config_service.get<string>('notifications.twilio_from_whatsapp') ?? ''
    ).trim();
    if (!from_raw) {
      throw new Error('TWILIO_FROM_WHATSAPP no configurado');
    }
    const from = from_raw.startsWith('whatsapp:') ? from_raw : `whatsapp:${from_raw}`;
    const to = request.to_e164.startsWith('whatsapp:')
      ? request.to_e164
      : `whatsapp:${request.to_e164}`;

    const client = this.create_client();
    try {
      await client.messages.create({
        body: request.body,
        from,
        to,
      });
    } catch (err: unknown) {
      this.log_twilio_error('whatsapp', err);
      throw err instanceof Error ? err : new Error(String(err));
    }
  }

  private create_client(): ReturnType<typeof twilio> {
    const sid = (this.config_service.get<string>('notifications.twilio_account_sid') ?? '').trim();
    const token = (this.config_service.get<string>('notifications.twilio_auth_token') ?? '').trim();
    if (!sid || !token) {
      throw new Error('Twilio no configurado (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)');
    }
    return twilio(sid, token);
  }

  /** Evita registrar números ni cuerpo del mensaje. */
  private log_twilio_error(channel: string, err: unknown): void {
    const code =
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (typeof (err as { code: unknown }).code === 'number' ||
        typeof (err as { code: unknown }).code === 'string')
        ? String((err as { code: string | number }).code)
        : 'n/a';
    const status =
      typeof err === 'object' &&
      err !== null &&
      'status' in err &&
      typeof (err as { status: unknown }).status === 'number'
        ? String((err as { status: number }).status)
        : 'n/a';
    this.logger.error(`[Twilio][channel=${channel}][step=send_failed][code=${code}][status=${status}]`);
  }
}
