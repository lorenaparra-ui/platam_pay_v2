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

const CONTRACTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT =
  'http://127.0.0.1:4566/000000000000/contracts-ms-outbound-placeholder';

class ContractsSqsEnv {
  @IsString()
  aws_region = 'us-east-1';

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsString()
  aws_sqs_endpoint?: string;

  @IsUrl({ require_tld: false })
  contracts_sqs_outbound_queue_url!: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  contracts_sqs_create_contract_queue_url?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : value))
  @IsUrl({ require_tld: false })
  contracts_sqs_get_contract_queue_url?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(20)
  contracts_sqs_wait_time_seconds = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  contracts_sqs_max_number_of_messages = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(43200)
  contracts_sqs_visibility_timeout_seconds = 30;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  contracts_sqs_delete_on_validation_error = false;
}

function validate_contracts_sqs_env(config: Record<string, unknown>): ContractsSqsEnv {
  const validated = plainToInstance(ContractsSqsEnv, config, { enableImplicitConversion: true });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    const message = errors.map((e) => Object.values(e.constraints ?? {}).join(', ')).join('; ');
    throw new Error(`Configuración SQS inválida: ${message}`);
  }
  return validated;
}

export function get_contracts_sqs_config_from_env(): {
  region: string;
  endpoint?: string;
  outbound_queue_url: string;
  create_contract_queue_url?: string;
  get_contract_queue_url?: string;
  wait_time_seconds: number;
  max_number_of_messages: number;
  visibility_timeout_seconds: number;
  delete_on_validation_error: boolean;
} {
  const outbound_raw = process.env.CONTRACTS_SQS_OUTBOUND_QUEUE_URL?.trim();
  const env = validate_contracts_sqs_env({
    aws_region: process.env.AWS_REGION ?? 'us-east-1',
    aws_sqs_endpoint: process.env.AWS_SQS_ENDPOINT,
    contracts_sqs_outbound_queue_url:
      outbound_raw && outbound_raw.length > 0
        ? outbound_raw
        : CONTRACTS_SQS_OUTBOUND_QUEUE_URL_DEFAULT,
    contracts_sqs_create_contract_queue_url: process.env.CONTRACTS_SQS_CREATE_CONTRACT_QUEUE_URL,
    contracts_sqs_get_contract_queue_url: process.env.CONTRACTS_SQS_GET_CONTRACT_QUEUE_URL,
    contracts_sqs_wait_time_seconds: process.env.CONTRACTS_SQS_WAIT_TIME_SECONDS ?? 20,
    contracts_sqs_max_number_of_messages:
      process.env.CONTRACTS_SQS_MAX_NUMBER_OF_MESSAGES ?? 10,
    contracts_sqs_visibility_timeout_seconds:
      process.env.CONTRACTS_SQS_VISIBILITY_TIMEOUT_SECONDS ?? 30,
    contracts_sqs_delete_on_validation_error:
      process.env.CONTRACTS_SQS_DELETE_ON_VALIDATION_ERROR === 'true',
  });

  return {
    region: env.aws_region,
    endpoint: env.aws_sqs_endpoint,
    outbound_queue_url: env.contracts_sqs_outbound_queue_url,
    create_contract_queue_url: env.contracts_sqs_create_contract_queue_url,
    get_contract_queue_url: env.contracts_sqs_get_contract_queue_url,
    wait_time_seconds: env.contracts_sqs_wait_time_seconds,
    max_number_of_messages: env.contracts_sqs_max_number_of_messages,
    visibility_timeout_seconds: env.contracts_sqs_visibility_timeout_seconds,
    delete_on_validation_error: env.contracts_sqs_delete_on_validation_error,
  };
}

export const sqs_config = registerAs('sqs', () => get_contracts_sqs_config_from_env());
