import { IsObject, IsOptional, IsString, IsUUID, MaxLength, ValidateIf } from 'class-validator';

/**
 * Cuerpo JSON esperado en CONTRACTS_SQS_CREATE_CONTRACT_QUEUE_URL.
 * No incluir secretos en logs; el consumer no registra el token ni respuestas con URLs sin truncar.
 */
export class ContractsSqsCreatePayloadDto {
  @IsOptional()
  @IsUUID('4')
  correlation_id?: string;

  @IsOptional()
  @IsUUID('4')
  external_id?: string;

  @IsUUID('4')
  user_external_id!: string;

  @IsOptional()
  @IsUUID('4')
  application_external_id?: string;

  @IsUUID('4')
  status_external_id!: string;

  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsString()
  @MaxLength(2048)
  zapsign_token?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsString()
  original_file_url?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsString()
  signed_file_url?: string | null;

  @IsOptional()
  @IsObject()
  form_answers_json?: Record<string, unknown> | null;
}
