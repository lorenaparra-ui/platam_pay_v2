import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { UseCase } from '@platam/shared';
import { DispatchNotificationUseCase } from '@modules/notifications/application/use-cases/dispatch-notification.use-case';
import { NotificationChannel } from '@modules/notifications/domain/notification-channel.enum';
import {
  EmailNotificationPayloadDto,
  SendNotificationInboundEnvelopeDto,
  SmsNotificationPayloadDto,
  WhatsappNotificationPayloadDto,
  WhatsappTemplateNotificationPayloadDto,
} from '@modules/notifications/application/dto/send-notification-payload.dto';

export type IngestNotificationSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

type ValidatedPayload =
  | EmailNotificationPayloadDto
  | SmsNotificationPayloadDto
  | WhatsappNotificationPayloadDto
  | WhatsappTemplateNotificationPayloadDto;

@Injectable()
export class IngestNotificationSqsMessageUseCase
  implements UseCase<IngestNotificationSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestNotificationSqsMessageUseCase.name);

  constructor(private readonly dispatch: DispatchNotificationUseCase) {}

  async execute(command: IngestNotificationSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(command.body) as unknown;
    } catch {
      this.logger.warn('[Notify][step=parse] cuerpo no es JSON válido.');
      return command.delete_on_validation_error;
    }

    const correlation_for_log = this.try_correlation_id(parsed) ?? 'unknown';

    const envelope = plainToInstance(SendNotificationInboundEnvelopeDto, parsed as object, {
      enableImplicitConversion: true,
    });
    const env_errors = validateSync(envelope as object, { forbidUnknownValues: false });
    if (env_errors.length > 0) {
      const message = env_errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      this.logger.warn(
        `[Notify][correlationId=${correlation_for_log}][step=envelope_validation] ${message}`,
      );
      return command.delete_on_validation_error;
    }

    const payload_result = this.validate_payload(envelope.channel, envelope.payload);
    if (!payload_result.ok) {
      this.logger.warn(
        `[Notify][correlationId=${envelope.correlation_id}][step=payload_validation] ${payload_result.error}`,
      );
      return command.delete_on_validation_error;
    }

    try {
      await this.dispatch.execute({
        correlation_id: envelope.correlation_id,
        channel: envelope.channel,
        payload: payload_result.payload,
      });
      return true;
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `[Notify][correlationId=${envelope.correlation_id}][step=dispatch_failed] ${text}`,
      );
      return false;
    }
  }

  private validate_payload(
    channel: NotificationChannel,
    raw: Record<string, unknown>,
  ): { ok: true; payload: ValidatedPayload } | { ok: false; error: string } {
    switch (channel) {
      case NotificationChannel.email: {
        const dto = plainToInstance(EmailNotificationPayloadDto, raw, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(dto as object, { forbidUnknownValues: false });
        if (errors.length > 0) {
          return {
            ok: false,
            error: errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; '),
          };
        }
        const html = dto.html?.trim();
        const text = dto.text?.trim();
        if (!html && !text) {
          return { ok: false, error: 'email requiere html o text no vacío' };
        }
        return { ok: true, payload: dto };
      }
      case NotificationChannel.sms: {
        const dto = plainToInstance(SmsNotificationPayloadDto, raw, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(dto as object, { forbidUnknownValues: false });
        if (errors.length > 0) {
          return {
            ok: false,
            error: errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; '),
          };
        }
        return { ok: true, payload: dto };
      }
      case NotificationChannel.whatsapp: {
        const dto = plainToInstance(WhatsappNotificationPayloadDto, raw, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(dto as object, { forbidUnknownValues: false });
        if (errors.length > 0) {
          return {
            ok: false,
            error: errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; '),
          };
        }
        return { ok: true, payload: dto };
      }
      case NotificationChannel.whatsapp_template: {
        const dto = plainToInstance(WhatsappTemplateNotificationPayloadDto, raw, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(dto as object, { forbidUnknownValues: false });
        if (errors.length > 0) {
          return {
            ok: false,
            error: errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; '),
          };
        }
        return { ok: true, payload: dto };
      }
      default: {
        const _exhaustive: never = channel;
        void _exhaustive;
        return { ok: false, error: 'canal desconocido' };
      }
    }
  }

  private try_correlation_id(parsed: unknown): string | undefined {
    if (typeof parsed !== 'object' || parsed === null) {
      return undefined;
    }
    const o = parsed as Record<string, unknown>;
    if (typeof o.correlationId === 'string') {
      return o.correlationId;
    }
    if (typeof o.correlation_id === 'string') {
      return o.correlation_id;
    }
    return undefined;
  }
}
