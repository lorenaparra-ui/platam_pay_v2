import { registerAs } from '@nestjs/config';

/**
 * Credenciales y remitentes para Resend y Twilio.
 * No registrar valores en logs; solo lectura vía ConfigService en adaptadores.
 */
export default registerAs('notifications', () => ({
  resend_api_key: (process.env.RESEND_API_KEY ?? '').trim(),
  email_from_default: (process.env.NOTIFICATIONS_EMAIL_FROM ?? '').trim(),
  twilio_account_sid: (process.env.TWILIO_ACCOUNT_SID ?? '').trim(),
  twilio_auth_token: (process.env.TWILIO_AUTH_TOKEN ?? '').trim(),
  twilio_from_sms: (process.env.TWILIO_FROM_SMS ?? '').trim(),
  twilio_from_whatsapp: (process.env.TWILIO_FROM_WHATSAPP ?? '').trim(),
}));
