import { Injectable, Logger } from '@nestjs/common';
import type { GoogleChatNotifierPort } from '@modules/credit-applications/domain/ports/google-chat-notifier.port';

@Injectable()
export class HttpGoogleChatNotifierAdapter implements GoogleChatNotifierPort {
  private readonly logger = new Logger(HttpGoogleChatNotifierAdapter.name);

  async notify_compliance(text: string): Promise<void> {
    await this.send(process.env.GOOGLE_CHAT_COMPLIANCE_WEBHOOK_URL, 'compliance', text);
  }

  async notify_technical(text: string): Promise<void> {
    await this.send(process.env.GOOGLE_CHAT_TECHNICAL_WEBHOOK_URL, 'technical', text);
  }

  async notify_analysts(text: string): Promise<void> {
    await this.send(process.env.GOOGLE_CHAT_ANALYSTS_WEBHOOK_URL, 'analysts', text);
  }

  private async send(webhook_url: string | undefined, channel: string, text: string): Promise<void> {
    if (!webhook_url) {
      this.logger.warn(`[GoogleChat][channel=${channel}] webhook URL no configurado — mensaje descartado`);
      return;
    }

    try {
      const res = await fetch(webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        this.logger.warn(`[GoogleChat][channel=${channel}] respuesta no-ok: ${res.status}`);
      }
    } catch (err) {
      this.logger.error(`[GoogleChat][channel=${channel}] error al enviar: ${String(err)}`);
    }
  }
}
