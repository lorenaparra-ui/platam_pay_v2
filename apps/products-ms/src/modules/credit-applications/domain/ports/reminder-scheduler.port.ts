export interface WhatsappTemplateReminderPayload {
  readonly channel: 'whatsapp_template';
  readonly to_e164: string;
  readonly content_sid: string;
  readonly content_variables: Record<string, string>;
}

export interface EmailReminderPayload {
  readonly channel: 'email';
  readonly to: readonly string[];
  readonly subject: string;
  readonly html: string;
}

export type ReminderNotificationPayload = WhatsappTemplateReminderPayload | EmailReminderPayload;

export interface ScheduleReminderParams {
  readonly credit_application_external_id: string;
  readonly fire_at: Date;
  /** 'reminder_1' = T+24h, 'reminder_2' = T+48h */
  readonly reminder_type: 'reminder_1' | 'reminder_2';
  readonly notification: ReminderNotificationPayload;
}

export interface ReminderSchedulerPort {
  /** Crea un EventBridge schedule único para el reminder indicado. Llamar 4 veces (WA + email × 2). */
  schedule_reminder(params: ScheduleReminderParams): Promise<void>;
  /** Cancela los 4 schedules asociados al externalId (reminder_1/2 × wa/email). */
  cancel_reminders(credit_application_external_id: string): Promise<void>;
}

// Token definido en credit-applications.tokens.ts para evitar duplicidad de Symbol.
