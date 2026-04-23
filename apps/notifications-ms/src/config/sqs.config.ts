import { registerAs } from '@nestjs/config';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  validateSync,
} from 'class-validator';

const NOTIFICATIONS_SQS_OUTBOUND_QUEUE_URL_DEFAULT =
  'http://127.0.0.1:4566/000000000000/notifications-ms-outbound-placeholder';

class NotificationsSqsEnv {
  @IsString()
  aws_region = 'us-east-1';

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsString()
  aws_sqs_endpoint?: string;

  @IsUrl({ require_tld: false })
  notifications_sqs_outbound_queue_url!: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  notifications_sqs_inbound_queue_url?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(20)
  notifications_sqs_wait_time_seconds = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  notifications_sqs_max_number_of_messages = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(43200)
  notifications_sqs_visibility_timeout_seconds = 30;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  notifications_sqs_delete_on_validation_error = false;
}

function validate_notifications_sqs_env(config: Record<string, unknown>): NotificationsSqsEnv {
  const validated = plainToInstance(NotificationsSqsEnv, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
    throw new Error(`Configuración SQS inválida (notifications-ms): ${message}`);
  }
  return validated;
}

export function get_notifications_sqs_config_from_env(): {
  region: string;
  endpoint?: string;
  outbound_queue_url: string;
  inbound_queue_url?: string;
  wait_time_seconds: number;
  max_number_of_messages: number;
  visibility_timeout_seconds: number;
  delete_on_validation_error: boolean;
} {
  const outbound_raw = process.env.NOTIFICATIONS_SQS_OUTBOUND_QUEUE_URL?.trim();
  const env = validate_notifications_sqs_env({
    aws_region: process.env.AWS_REGION ?? 'us-east-1',
    aws_sqs_endpoint: process.env.AWS_SQS_ENDPOINT,
    notifications_sqs_outbound_queue_url:
      outbound_raw && outbound_raw.length > 0
        ? outbound_raw
        : NOTIFICATIONS_SQS_OUTBOUND_QUEUE_URL_DEFAULT,
    notifications_sqs_inbound_queue_url: process.env.NOTIFICATIONS_SQS_INBOUND_QUEUE_URL,
    notifications_sqs_wait_time_seconds: process.env.NOTIFICATIONS_SQS_WAIT_TIME_SECONDS ?? 20,
    notifications_sqs_max_number_of_messages:
      process.env.NOTIFICATIONS_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
    notifications_sqs_visibility_timeout_seconds:
      process.env.NOTIFICATIONS_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
    notifications_sqs_delete_on_validation_error:
      process.env.NOTIFICATIONS_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
  });

  const trim_url = (v: string | undefined): string | undefined => {
    if (v === undefined) {
      return undefined;
    }
    const t = v.trim();
    return t.length > 0 ? t : undefined;
  };

  return {
    region: env.aws_region,
    endpoint: env.aws_sqs_endpoint,
    outbound_queue_url: env.notifications_sqs_outbound_queue_url,
    inbound_queue_url: trim_url(env.notifications_sqs_inbound_queue_url),
    wait_time_seconds: env.notifications_sqs_wait_time_seconds,
    max_number_of_messages: env.notifications_sqs_max_number_of_messages,
    visibility_timeout_seconds: env.notifications_sqs_visibility_timeout_seconds,
    delete_on_validation_error: env.notifications_sqs_delete_on_validation_error,
  };
}

export const sqs_config = registerAs('sqs', () => get_notifications_sqs_config_from_env());
