import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class UpdateContractHttpDto {
  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({ format: 'uuid' })
  application_external_id?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsUUID('4')
  @ApiPropertyOptional({
    format: 'uuid',
    nullable: true,
    description: 'Plantilla; null desvincula contract_template_id.',
  })
  contract_template_external_id?: string | null;

  @IsOptional()
  @IsUUID('4')
  @ApiPropertyOptional({ format: 'uuid' })
  status_external_id?: string;

  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsString()
  @MaxLength(2048)
  @ApiPropertyOptional()
  zapsign_token?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsString()
  @ApiPropertyOptional()
  original_file_url?: string | null;

  @IsOptional()
  @ValidateIf((_, v) => v !== null && v !== undefined)
  @IsString()
  @ApiPropertyOptional()
  signed_file_url?: string | null;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  form_answers_json?: Record<string, unknown> | null;
}
