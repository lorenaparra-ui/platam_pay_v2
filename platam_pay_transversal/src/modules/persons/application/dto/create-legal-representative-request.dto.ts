import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateLegalRepresentativeRequestDto {
  @ApiProperty({ example: 1, description: 'ID de la empresa' })
  @IsInt()
  @Min(1)
  companyId: number;

  @ApiProperty({ example: 1, description: 'ID de la persona' })
  @IsInt()
  @Min(1)
  personId: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si es el representante legal principal',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
