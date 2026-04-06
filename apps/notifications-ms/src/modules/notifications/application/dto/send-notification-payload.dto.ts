import { Expose, Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NotificationChannel } from '@modules/notifications/domain/notification-channel.enum';

/** Cuerpo de correo: al menos uno de html o text debe ser no vacío (validado en ingest). */
export class EmailNotificationPayloadDto {
  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  @IsEmail({}, { each: true })
  to!: string[];

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(998)
  subject!: string;

  @Expose()
  @IsOptional()
  @IsString()
  html?: string;

  @Expose()
  @IsOptional()
  @IsString()
  text?: string;

  @Expose()
  @Transform(({ obj }) => {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const r = obj as Record<string, unknown>;
    return r.fromOverride ?? r.from_override;
  })
  @IsOptional()
  @IsEmail()
  from_override?: string;
}

export class SmsNotificationPayloadDto {
  @Expose()
  @Transform(({ obj }) => {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const r = obj as Record<string, unknown>;
    return r.toE164 ?? r.to_e164;
  })
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'to_e164 debe ser E.164 (ej. +573001234567)',
  })
  to_e164!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(1600)
  body!: string;
}

export class WhatsappNotificationPayloadDto {
  @Expose()
  @Transform(({ obj }) => {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const r = obj as Record<string, unknown>;
    return r.toE164 ?? r.to_e164;
  })
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'to_e164 debe ser E.164 (ej. +573001234567)',
  })
  to_e164!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(4096)
  body!: string;
}

/**
 * Contrato entrante SQS v1.0 (event: "send-notification", version: "1.0").
 * - correlationId o correlation_id
 * - channel: "email" | "sms" | "whatsapp"
 * - payload: según canal (email: to[], subject, html y/o text; sms/whatsapp: toE164|to_e164, body)
 */
export class SendNotificationInboundEnvelopeDto {
  @Expose()
  @IsIn(['send-notification'])
  event!: string;

  @Expose()
  @IsIn(['1.0'])
  version!: string;

  @Expose()
  @Transform(({ obj }) => {
    if (typeof obj !== 'object' || obj === null) return undefined;
    const r = obj as Record<string, unknown>;
    if (typeof r.correlationId === 'string') return r.correlationId;
    if (typeof r.correlation_id === 'string') return r.correlation_id;
    return undefined;
  })
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  correlation_id!: string;

  @Expose()
  @IsEnum(NotificationChannel)
  channel!: NotificationChannel;

  @Expose()
  @IsObject()
  payload!: Record<string, unknown>;
}
