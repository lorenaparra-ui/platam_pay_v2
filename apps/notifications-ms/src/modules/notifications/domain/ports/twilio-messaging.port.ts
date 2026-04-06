export interface TwilioSmsSendRequest {
  readonly to_e164: string;
  readonly body: string;
}

export interface TwilioWhatsappSendRequest {
  readonly to_e164: string;
  readonly body: string;
}

export interface TwilioMessagingPort {
  send_sms(request: TwilioSmsSendRequest): Promise<void>;
  send_whatsapp(request: TwilioWhatsappSendRequest): Promise<void>;
}

export const TWILIO_MESSAGING_PORT = Symbol('TWILIO_MESSAGING_PORT');
