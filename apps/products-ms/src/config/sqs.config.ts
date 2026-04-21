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

/** URL sintácticamente válida para arranque local si no hay cola configurada (LocalStack o stub). */
const PRODUCTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT =
  'http://127.0.0.1:4566/000000000000/products-ms-outbound-placeholder';

class ProductsSqsEnv {
  @IsString()
  aws_region = 'us-east-1';

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsString()
  aws_sqs_endpoint?: string;

  @IsUrl({ require_tld: false })
  products_sqs_outbound_queue_url!: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  products_sqs_inbound_queue_url?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  notifications_sqs_inbound_queue_url?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(20)
  products_sqs_wait_time_seconds = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  products_sqs_max_number_of_messages = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(43200)
  products_sqs_visibility_timeout_seconds = 30;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  products_sqs_delete_on_validation_error = false;
}

function validate_products_sqs_env(config: Record<string, unknown>): ProductsSqsEnv {
  const validated = plainToInstance(ProductsSqsEnv, config, { enableImplicitConversion: true });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
    throw new Error(`Configuración SQS inválida: ${message}`);
  }
  return validated;
}

export function get_products_sqs_config_from_env(): {
  region: string;
  endpoint?: string;
  outbound_queue_url: string;
  inbound_queue_url?: string;
  notifications_inbound_queue_url?: string;
  wait_time_seconds: number;
  max_number_of_messages: number;
  visibility_timeout_seconds: number;
  delete_on_validation_error: boolean;
} {
  const outbound_raw = process.env.PRODUCTS_SQS_OUTBOUND_QUEUE_URL?.trim();
  const env = validate_products_sqs_env({
    aws_region: process.env.AWS_REGION ?? 'us-east-1',
    aws_sqs_endpoint: process.env.AWS_SQS_ENDPOINT,
    products_sqs_outbound_queue_url:
      outbound_raw && outbound_raw.length > 0
        ? outbound_raw
        : PRODUCTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT,
    products_sqs_inbound_queue_url: process.env.PRODUCTS_SQS_INBOUND_QUEUE_URL,
    notifications_sqs_inbound_queue_url: process.env.NOTIFICATIONS_SQS_INBOUND_QUEUE_URL,
    products_sqs_wait_time_seconds: process.env.PRODUCTS_SQS_WAIT_TIME_SECONDS ?? 20,
    products_sqs_max_number_of_messages:
      process.env.PRODUCTS_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
    products_sqs_visibility_timeout_seconds:
      process.env.PRODUCTS_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
    products_sqs_delete_on_validation_error:
      process.env.PRODUCTS_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
  });

  return {
    region: env.aws_region,
    endpoint: env.aws_sqs_endpoint,
    outbound_queue_url: env.products_sqs_outbound_queue_url,
    inbound_queue_url: env.products_sqs_inbound_queue_url,
    notifications_inbound_queue_url: env.notifications_sqs_inbound_queue_url,
    wait_time_seconds: env.products_sqs_wait_time_seconds,
    max_number_of_messages: env.products_sqs_max_number_of_messages,
    visibility_timeout_seconds: env.products_sqs_visibility_timeout_seconds,
    delete_on_validation_error: env.products_sqs_delete_on_validation_error,
  };
}

export const sqs_config = registerAs('sqs', () => get_products_sqs_config_from_env());
