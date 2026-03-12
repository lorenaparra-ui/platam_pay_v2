import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

const GUARANTOR_TYPES = ['personal', 'corporate', 'spousal', 'third_party'] as const;

export class CreateGuarantorRequestDto {
  @ApiProperty({ example: 1, description: 'ID de la solicitud de crédito' })
  @IsInt()
  @Min(1)
  creditApplicationId: number;

  @ApiProperty({ example: 1, description: 'ID de la persona' })
  @IsInt()
  @Min(1)
  personId: number;

  @ApiPropertyOptional({ example: 1, description: 'ID del firmante del contrato' })
  @IsOptional()
  @IsInt()
  @Min(1)
  contractSignerId?: number | null;

  @ApiProperty({
    example: 'personal',
    description: 'Tipo: personal | corporate | spousal | third_party',
    enum: GUARANTOR_TYPES,
  })
  @IsString()
  @IsIn(GUARANTOR_TYPES)
  guarantorType: string;

  @ApiPropertyOptional({
    example: 'Cónyuge',
    description: 'Relación con el solicitante',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  relationshipToApplicant?: string | null;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPrimaryGuarantor?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  selectedAfterCreditCheck?: boolean;

  @ApiPropertyOptional({ description: 'URL de la firma' })
  @IsOptional()
  @IsUrl()
  signatureUrl?: string | null;

  @ApiPropertyOptional({ description: 'Fecha de firma' })
  @IsOptional()
  signatureDate?: string | null;
}
