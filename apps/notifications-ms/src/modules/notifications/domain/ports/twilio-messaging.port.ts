export interface TwilioSmsSendRequest {
  readonly to_e164: string;
  readonly body: string;
}

export interface TwilioWhatsappSendRequest {
  readonly to_e164: string;
  readonly body: string;
}

/** Envío via Twilio Content API (plantillas pre-aprobadas Meta/WhatsApp). */
export interface TwilioWhatsappTemplateSendRequest {
  readonly to_e164: string;
  /** Content SID de Twilio (HXxxxx). Obtenido del Content Template Builder. */
  readonly content_sid: string;
  /** Variables de la plantilla. Claves = índice numérico como string ("1", "2", ...). */
  readonly content_variables: Record<string, string>;
}

export interface TwilioMessagingPort {
  send_sms(request: TwilioSmsSendRequest): Promise<void>;
  send_whatsapp(request: TwilioWhatsappSendRequest): Promise<void>;
  send_whatsapp_template(request: TwilioWhatsappTemplateSendRequest): Promise<void>;
}

export const TWILIO_MESSAGING_PORT = Symbol('TWILIO_MESSAGING_PORT');
