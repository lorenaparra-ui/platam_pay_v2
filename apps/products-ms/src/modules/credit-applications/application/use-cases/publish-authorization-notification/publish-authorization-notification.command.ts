/** Canal de formulario que originó la solicitud. Determina qué plantilla Twilio usar. */
export type CreditApplicationClientType = 'pn' | 'pj';

export interface PublishAuthorizationNotificationCommand {
  readonly credit_application_external_id: string;
  readonly client_type: CreditApplicationClientType;
  /** Teléfono en formato E.164 (ej. +573001234567). */
  readonly client_phone_e164: string;
  readonly client_email: string;
  readonly client_first_name: string;
  /** Nombre comercial del partner (ej. "Luker"). Puede ser null si Bug B1 no está corregido. */
  readonly partner_name: string | null;
  /** Solo PJ: razón social de la empresa del cliente. */
  readonly business_legal_name?: string | null;
}
