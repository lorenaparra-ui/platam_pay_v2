import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OnboardingContextDto {
  @ApiProperty({ description: 'Identificador del partner (UUID o externo)' })
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty({ description: 'Identificador del representante de ventas' })
  @IsString()
  @IsNotEmpty()
  salesRepId: string;

  @ApiPropertyOptional({ description: 'Identificador de categoría comercial' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;
}
