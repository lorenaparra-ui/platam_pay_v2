import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreateContractHttpDto {
  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({ format: 'uuid' })
  external_id?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({
    format: 'uuid',
    description:
      'Usuario (transversal_schema.users). Opcional si el flujo crea el contrato antes del titular.',
  })
  user_external_id?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({ format: 'uuid' })
  application_external_id?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({
    format: 'uuid',
    description:
      'Plantilla (products_schema.contract_templates; sin anclaje por categoría/facility en DDL). Si no se envía, se usa la primera plantilla con version = 1.',
  })
  contract_template_external_id?: string;

  @IsUUID('4')
  @ApiProperty({ format: 'uuid' })
  status_external_id!: string;

  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  @MaxLength(2048)
  @ApiPropertyOptional()
  zapsign_token?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  @ApiPropertyOptional()
  original_file_url?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  @ApiPropertyOptional()
  signed_file_url?: string | null;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  form_answers_json?: Record<string, unknown> | null;
}
