import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBusinessRequestDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado' })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({ example: 1, required: false, nullable: true, description: 'ID de la ciudad' })
  @IsOptional()
  @IsInt()
  @Min(1)
  cityId?: number | null;

  @ApiProperty({ example: 'PJ', enum: ['PN', 'PJ'], description: 'Tipo de entidad (PN persona natural, PJ persona jurídica)' })
  @IsIn(['PN', 'PJ'])
  entityType: 'PN' | 'PJ';

  @ApiProperty({ example: 'Mi Empresa SAS', required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  businessName?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  businessAddress?: string | null;

  @ApiProperty({ example: 'SAS', required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  businessType?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  relationshipToBusiness?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  legalName?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  tradeName?: string | null;

  @ApiProperty({ example: '901548471', required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  taxId?: string | null;

  @ApiProperty({ example: 2020, required: false, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1800)
  yearOfEstablishment?: number | null;
}
