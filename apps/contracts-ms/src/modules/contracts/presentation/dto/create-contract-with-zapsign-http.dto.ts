import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class ZapsignReplacementHttpDto {
  @IsString()
  @MaxLength(512)
  @ApiProperty()
  from!: string;

  @IsString()
  @MaxLength(8192)
  @ApiProperty()
  to!: string;
}

export class CreateContractWithZapsignHttpDto {
  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({ format: 'uuid' })
  external_id?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({ format: 'uuid' })
  user_external_id?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({ format: 'uuid' })
  application_external_id?: string;

  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Plantilla; se usa `zapsign_template_ref` de la fila para ZapSign.',
  })
  contract_template_external_id?: string;

  @IsUUID('4')
  @ApiProperty({ format: 'uuid' })
  status_external_id!: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty()
  signer_name!: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty()
  signer_email!: string;

  @IsString()
  @MaxLength(8)
  @ApiProperty({ description: 'Código país teléfono, ej. +57 o 57' })
  signer_phone_country!: string;

  @IsString()
  @MaxLength(32)
  @ApiProperty()
  signer_phone_number!: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Por defecto según ZAPSIGN_SANDBOX_DEFAULT' })
  sandbox?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  @ApiPropertyOptional({ description: 'Carpeta en ZapSign; por defecto config' })
  folder_path?: string;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  template_data?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ZapsignReplacementHttpDto)
  @ApiPropertyOptional({ type: [ZapsignReplacementHttpDto] })
  replacements?: ZapsignReplacementHttpDto[];

  @IsOptional()
  @ValidateIf((_, v) => v !== null)
  @IsObject()
  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    description: 'JSON adicional a fusionar en form_answers_json (sin datos sensibles).',
  })
  form_answers_json?: Record<string, unknown> | null;
}
