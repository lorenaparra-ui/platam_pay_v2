import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateSalesRepresentativeRequestDto {
  @ApiProperty({ example: 1, description: 'ID del partner' })
  @IsInt()
  @Min(1)
  partnerId: number;

  @ApiPropertyOptional({ example: 1, description: 'ID del usuario asociado' })
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number | null;

  @ApiProperty({ example: 'María García', description: 'Nombre del representante' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'Ejecutivo de ventas', description: 'Rol' })
  @IsString()
  @MaxLength(255)
  role: string;

  @ApiProperty({ example: 1, description: 'ID del status (ej: activo)' })
  @IsInt()
  @Min(1)
  statusId: number;
}
