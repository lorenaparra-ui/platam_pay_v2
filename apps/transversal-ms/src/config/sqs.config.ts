/**
 * SQS de transversal-ms usa únicamente colas en AWS (endpoint regional del SDK).
 * No se define `AWS_SQS_ENDPOINT` ni URLs tipo LocalStack para este servicio.
 */
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

class SqsEnv {
  @IsString()
  aws_region = 'us-east-2';

  @IsUrl({ require_tld: false })
  transversal_sqs_outbound_queue_url!: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  transversal_sqs_inbound_queue_url?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  transversal_sqs_upload_files_queue_url?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  transversal_sqs_create_user_queue_url?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  transversal_sqs_suppliers_callback_queue_url?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(20)
  transversal_sqs_wait_time_seconds = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  transversal_sqs_max_number_of_messages = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(43200)
  transversal_sqs_visibility_timeout_seconds = 30;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  transversal_sqs_delete_on_validation_error = false;

  /**
   * Si es true, transversal-ms hace poll de TRANSVERSAL_SQS_INBOUND_QUEUE_URL.
   * Por defecto false: esa cola suele consumirla suppliers-ms (files-uploaded).
   */
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  transversal_sqs_inbound_consumer_enabled = false;
}

function validate_sqs_env(config: Record<string, unknown>): SqsEnv {
  const validated = plainToInstance(SqsEnv, config, { enableImplicitConversion: true });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
    throw new Error(`Configuración SQS inválida: ${message}`);
  }
  return validated;
}

export function get_sqs_config_from_env(): {
  region: string;
  outbound_queue_url: string;
  inbound_queue_url?: string;
  upload_files_queue_url?: string;
  create_partner_user_queue_url?: string;
  suppliers_callback_queue_url?: string;
  inbound_consumer_enabled: boolean;
  wait_time_seconds: number;
  max_number_of_messages: number;
  visibility_timeout_seconds: number;
  delete_on_validation_error: boolean;
} {
  const env = validate_sqs_env({
    aws_region: process.env.AWS_REGION ?? 'us-east-1',
    transversal_sqs_outbound_queue_url: process.env.TRANSVERSAL_SQS_OUTBOUND_QUEUE_URL,
    transversal_sqs_inbound_queue_url: process.env.TRANSVERSAL_SQS_INBOUND_QUEUE_URL,
    transversal_sqs_upload_files_queue_url: process.env.TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL,
    transversal_sqs_create_user_queue_url: process.env.TRANSVERSAL_SQS_CREATE_USER_QUEUE_URL,
    transversal_sqs_suppliers_callback_queue_url:
      process.env.TRANSVERSAL_SQS_SUPPLIERS_CALLBACK_QUEUE_URL,
    transversal_sqs_inbound_consumer_enabled:
      process.env.TRANSVERSAL_SQS_INBOUND_CONSUMER_ENABLED === 'true',
    transversal_sqs_wait_time_seconds: process.env.TRANSVERSAL_SQS_WAIT_TIME_SECONDS ?? 20,
    transversal_sqs_max_number_of_messages:
      process.env.TRANSVERSAL_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
    transversal_sqs_visibility_timeout_seconds:
      process.env.TRANSVERSAL_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
    transversal_sqs_delete_on_validation_error:
      process.env.TRANSVERSAL_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
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
    outbound_queue_url: env.transversal_sqs_outbound_queue_url.trim(),
    inbound_queue_url: trim_url(env.transversal_sqs_inbound_queue_url),
    upload_files_queue_url: trim_url(env.transversal_sqs_upload_files_queue_url),
    create_partner_user_queue_url: trim_url(env.transversal_sqs_create_user_queue_url),
    suppliers_callback_queue_url: trim_url(env.transversal_sqs_suppliers_callback_queue_url),
    inbound_consumer_enabled: env.transversal_sqs_inbound_consumer_enabled,
    wait_time_seconds: env.transversal_sqs_wait_time_seconds,
    max_number_of_messages: env.transversal_sqs_max_number_of_messages,
    visibility_timeout_seconds: env.transversal_sqs_visibility_timeout_seconds,
    delete_on_validation_error: env.transversal_sqs_delete_on_validation_error,
  };
}

export const sqs_config = registerAs('sqs', () => get_sqs_config_from_env());
