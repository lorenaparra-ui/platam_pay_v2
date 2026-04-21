import { Inject, Injectable, Logger } from '@nestjs/common';
import { QUEUES_CONFIG, type SqsQueuesUrlsConfig } from '@platam/shared';
import {
  OUTBOUND_MESSAGE_PUBLISHER_PORT,
  type OutboundMessagePublisherPort,
} from '@messaging/domain/ports/outbound-message-publisher.port';
import { REMINDER_SCHEDULER_PORT } from '@modules/credit-applications/credit-applications.tokens';
import type { ReminderSchedulerPort } from '@modules/credit-applications/domain/ports/reminder-scheduler.port';
import type { PublishAuthorizationNotificationCommand } from './publish-authorization-notification.command';

const APP_BASE_URL = process.env.APP_BASE_URL ?? 'https://platampay.com';

@Injectable()
export class PublishAuthorizationNotificationUseCase {
  private readonly logger = new Logger(PublishAuthorizationNotificationUseCase.name);

  constructor(
    @Inject(OUTBOUND_MESSAGE_PUBLISHER_PORT)
    private readonly publisher: OutboundMessagePublisherPort,
    @Inject(QUEUES_CONFIG)
    private readonly queues: SqsQueuesUrlsConfig,
    @Inject(REMINDER_SCHEDULER_PORT)
    private readonly reminder_scheduler: ReminderSchedulerPort,
  ) {}

  async execute(command: PublishAuthorizationNotificationCommand): Promise<void> {
    const queue_url = this.queues.notifications_inbound_queue_url;
    if (!queue_url) {
      this.logger.warn(
        `[AuthNotify][externalId=${command.credit_application_external_id}] NOTIFICATIONS_SQS_INBOUND_QUEUE_URL no configurado — notificación omitida`,
      );
      return;
    }

    const authorization_url = `${APP_BASE_URL}/auth/${command.credit_application_external_id}`;
    const partner_name = command.partner_name ?? 'Platam';

    const wa_initial = this.build_wa_initial_payload(command, partner_name);
    const email_initial = this.build_email_initial_payload(command, partner_name, authorization_url);

    await Promise.allSettled([
      this.publish(queue_url, 'whatsapp_template', wa_initial, command.credit_application_external_id, 'initial_wa'),
      this.publish(queue_url, 'email', email_initial, command.credit_application_external_id, 'initial_email'),
    ]);

    await this.schedule_reminders(command, partner_name, authorization_url);
  }

  private async schedule_reminders(
    command: PublishAuthorizationNotificationCommand,
    partner_name: string,
    authorization_url: string,
  ): Promise<void> {
    const external_id = command.credit_application_external_id;
    const now = new Date();
    const t24 = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const t48 = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const wa_reminder_1 = this.build_wa_reminder_payload(command, partner_name, 'reminder_1');
    const wa_reminder_2 = this.build_wa_reminder_payload(command, partner_name, 'reminder_2');
    const email_reminder_1 = this.build_email_reminder_payload(command, partner_name, authorization_url, 'reminder_1');
    const email_reminder_2 = this.build_email_reminder_payload(command, partner_name, authorization_url, 'reminder_2');

    const schedules = [
      { fire_at: t24, reminder_type: 'reminder_1' as const, notification: wa_reminder_1 },
      { fire_at: t24, reminder_type: 'reminder_1' as const, notification: email_reminder_1 },
      { fire_at: t48, reminder_type: 'reminder_2' as const, notification: wa_reminder_2 },
      { fire_at: t48, reminder_type: 'reminder_2' as const, notification: email_reminder_2 },
    ];

    await Promise.allSettled(
      schedules.map((s) =>
        this.reminder_scheduler
          .schedule_reminder({ credit_application_external_id: external_id, ...s })
          .catch((err: unknown) => {
            const text = err instanceof Error ? err.message : String(err);
            this.logger.warn(
              `[AuthNotify][externalId=${external_id}][step=schedule_failed][type=${s.reminder_type}][channel=${s.notification.channel}] ${text}`,
            );
          }),
      ),
    );
  }

  private async publish(
    queue_url: string,
    channel: string,
    payload: Record<string, unknown>,
    external_id: string,
    step: string,
  ): Promise<void> {
    const correlation_id = `auth-${step}-${external_id}`;
    try {
      await this.publisher.publish({
        queue_url,
        body: JSON.stringify({ event: 'send-notification', version: '1.0', correlation_id, channel, payload }),
      });
      this.logger.log(`[AuthNotify][externalId=${external_id}][step=${step}][step=published]`);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`[AuthNotify][externalId=${external_id}][step=${step}][step=publish_failed] ${text}`);
    }
  }

  // ──────────────────────────── WhatsApp helpers ────────────────────────────

  private build_wa_initial_payload(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
  ): Record<string, unknown> {
    const content_sid = cmd.client_type === 'pn'
      ? (process.env.TWILIO_TEMPLATE_AUTORIZACION_PN ?? '')
      : (process.env.TWILIO_TEMPLATE_AUTORIZACION_PJ ?? '');

    const content_variables = this.build_wa_variables(cmd, partner_name);
    return { to_e164: cmd.client_phone_e164, content_sid, content_variables };
  }

  private build_wa_reminder_payload(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
    reminder_type: 'reminder_1' | 'reminder_2',
  ): { channel: 'whatsapp_template'; to_e164: string; content_sid: string; content_variables: Record<string, string> } {
    const env_key = cmd.client_type === 'pn'
      ? (reminder_type === 'reminder_1' ? 'TWILIO_TEMPLATE_RECORDATORIO_1_PN' : 'TWILIO_TEMPLATE_RECORDATORIO_2_PN')
      : (reminder_type === 'reminder_1' ? 'TWILIO_TEMPLATE_RECORDATORIO_1_PJ' : 'TWILIO_TEMPLATE_RECORDATORIO_2_PJ');

    return {
      channel: 'whatsapp_template',
      to_e164: cmd.client_phone_e164,
      content_sid: process.env[env_key] ?? '',
      content_variables: cmd.client_type === 'pn'
        ? this.build_wa_variables_pn(cmd, partner_name)
        : this.build_wa_reminder_variables_pj(cmd, partner_name),
    };
  }

  private build_wa_variables(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
  ): Record<string, string> {
    return cmd.client_type === 'pn'
      ? this.build_wa_variables_pn(cmd, partner_name)
      : this.build_wa_initial_variables_pj(cmd, partner_name);
  }

  /** PN: {{1}}=firstName, {{2}}=partnerName, {{4}}=externalId */
  private build_wa_variables_pn(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
  ): Record<string, string> {
    return {
      '1': cmd.client_first_name,
      '2': partner_name,
      '4': cmd.credit_application_external_id,
    };
  }

  /** PJ inicial: {{1}}=firstName, {{2}}=partnerName, {{3}}=businessLegalName, {{4}}=externalId */
  private build_wa_initial_variables_pj(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
  ): Record<string, string> {
    return {
      '1': cmd.client_first_name,
      '2': partner_name,
      '3': cmd.business_legal_name ?? '',
      '4': cmd.credit_application_external_id,
    };
  }

  /** PJ recordatorios: {{1}}=firstName, {{2}}=businessLegalName, {{3}}=partnerName, {{4}}=externalId */
  private build_wa_reminder_variables_pj(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
  ): Record<string, string> {
    return {
      '1': cmd.client_first_name,
      '2': cmd.business_legal_name ?? '',
      '3': partner_name,
      '4': cmd.credit_application_external_id,
    };
  }

  // ──────────────────────────── Email helpers ────────────────────────────────

  private build_email_initial_payload(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
    authorization_url: string,
  ): Record<string, unknown> {
    const subject = `Autorización requerida para tu solicitud de crédito Platam | ${partner_name}`;
    const legal_name_line = cmd.client_type === 'pj' && cmd.business_legal_name
      ? `<p>Como representante legal de <strong>${cmd.business_legal_name}</strong>, autoriza a Platam Colombia SAS para consultar la información de la empresa en centrales de riesgo como DATACRÉDITO.</p>`
      : '';

    const html = `<!DOCTYPE html>
<html lang="es">
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h2>¡Hola ${cmd.client_first_name}!</h2>
  <p>Para continuar con tu solicitud de línea de crédito <strong>Platam | ${partner_name}</strong>, necesitamos tu autorización para consultar tus antecedentes crediticios.</p>
  <p>Al autorizar, confirmas que has leído y aceptas nuestra Política de Protección de Datos. Autorizas a Platam Colombia S.A.S para consultar tu información en centrales de riesgo como DATACRÉDITO y validar tus datos para el análisis de crédito.</p>
  ${legal_name_line}
  <p style="text-align:center;margin:32px 0;">
    <a href="${authorization_url}" style="background:#1a56db;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">
      AUTORIZAR CONSULTA CREDITICIA
    </a>
  </p>
  <p style="font-size:12px;color:#666;">Si el botón no funciona, copia y pega este enlace en tu navegador:<br>${authorization_url}</p>
  <p>¡Gracias por confiar en nosotros!</p>
  <p>Platam</p>
</body>
</html>`;

    return { to: [cmd.client_email], subject, html, from_override: 'Platam <noresponder@mail.platam.co>' };
  }

  private build_email_reminder_payload(
    cmd: PublishAuthorizationNotificationCommand,
    partner_name: string,
    authorization_url: string,
    reminder_type: 'reminder_1' | 'reminder_2',
  ): { channel: 'email'; to: readonly string[]; subject: string; html: string } {
    const is_last = reminder_type === 'reminder_2';
    const subject = is_last
      ? `Último recordatorio: autoriza tu solicitud de crédito Platam | ${partner_name}`
      : `Recordatorio: tu solicitud de crédito Platam | ${partner_name} espera tu autorización`;

    const body_text = is_last
      ? `Tu solicitud de línea de crédito con <strong>Platam | ${partner_name}</strong> sigue esperando tu autorización. Sin ella, no podemos continuar con tu estudio crediticio.<br><strong>Este es nuestro último recordatorio automático.</strong> Autoriza ahora para no perder tu solicitud.`
      : `Te recordamos que tu solicitud de línea de crédito con <strong>Platam | ${partner_name}</strong> está esperando tu autorización para avanzar.<br>Solo toma un segundo — autoriza la consulta y tu estudio crediticio comenzará de inmediato.`;

    const html = `<!DOCTYPE html>
<html lang="es">
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <h2>¡Hola ${cmd.client_first_name}!</h2>
  <p>${body_text}</p>
  <p style="text-align:center;margin:32px 0;">
    <a href="${authorization_url}" style="background:#1a56db;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">
      AUTORIZAR CONSULTA CREDITICIA
    </a>
  </p>
  <p style="font-size:12px;color:#666;">${authorization_url}</p>
  <p>¡Estamos listos para ayudarte!</p>
  <p>Platam</p>
</body>
</html>`;

    return { channel: 'email', to: [cmd.client_email] as const, subject, html };
  }
}
