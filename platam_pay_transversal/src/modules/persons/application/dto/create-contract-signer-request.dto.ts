import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateContractSignerRequestDto {
  @ApiPropertyOptional({ example: 1, description: 'ID del contrato' })
  @IsOptional()
  @IsInt()
  @Min(1)
  contractId?: number | null;

  @ApiPropertyOptional({ example: 1, description: 'ID de la persona' })
  @IsOptional()
  @IsInt()
  @Min(1)
  personId?: number | null;

  @ApiPropertyOptional({ description: 'Token del firmante en Zapsign' })
  @IsOptional()
  @IsString()
  zapsignSignerToken?: string | null;

  @ApiProperty({ example: 1, description: 'ID del status (ej: pending)' })
  @IsInt()
  @Min(1)
  statusId: number;

  @ApiPropertyOptional({ description: 'URL para firmar' })
  @IsOptional()
  @IsUrl()
  signUrl?: string | null;

  @ApiPropertyOptional({ description: 'IP del firmante', maxLength: 45 })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  ipAddress?: string | null;

  @ApiPropertyOptional({ description: 'Latitud', maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  geoLatitude?: string | null;

  @ApiPropertyOptional({ description: 'Longitud', maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  geoLongitude?: string | null;

  @ApiPropertyOptional({ description: 'Fecha de firma' })
  @IsOptional()
  signedAt?: string | null;

  @ApiPropertyOptional({ description: 'URL foto del documento' })
  @IsOptional()
  @IsUrl()
  documentPhotoUrl?: string | null;

  @ApiPropertyOptional({ description: 'URL foto del reverso del documento' })
  @IsOptional()
  @IsUrl()
  documentVersePhotoUrl?: string | null;

  @ApiPropertyOptional({ description: 'URL selfie' })
  @IsOptional()
  @IsUrl()
  selfiePhotoUrl?: string | null;

  @ApiPropertyOptional({ description: 'URL imagen de la firma' })
  @IsOptional()
  @IsUrl()
  signatureImageUrl?: string | null;
}
