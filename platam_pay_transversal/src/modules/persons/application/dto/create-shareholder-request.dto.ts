import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateShareholderRequestDto {
  @ApiProperty({ example: 1, description: 'ID de la empresa' })
  @IsInt()
  @Min(1)
  companyId: number;

  @ApiProperty({ example: 1, description: 'ID de la persona' })
  @IsInt()
  @Min(1)
  personId: number;

  @ApiPropertyOptional({
    example: '0.2500',
    description: 'Porcentaje de participación decimal (5,4). Ej: 0.25 = 25%',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{0,1}(\.\d{1,4})?$/, {
    message: 'Debe ser un decimal con hasta 4 cifras decimales (ej: 0.2500)',
  })
  @MaxLength(10)
  ownershipPercentage?: string | null;

  @ApiPropertyOptional({
    example: 1,
    description: 'Orden de evaluación del accionista',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  evaluationOrder?: number | null;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  creditCheckRequired?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  creditCheckCompleted?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isLegalRepresentative?: boolean;
}
