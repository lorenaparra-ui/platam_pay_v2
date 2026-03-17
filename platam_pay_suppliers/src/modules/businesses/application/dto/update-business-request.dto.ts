import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateBusinessRequestDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number;

  @ApiProperty({ example: 1, required: false, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  cityId?: number | null;

  @ApiProperty({ example: 'PJ', enum: ['PN', 'PJ'], required: false })
  @IsOptional()
  @IsIn(['PN', 'PJ'])
  entityType?: 'PN' | 'PJ';

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  businessName?: string | null;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  businessAddress?: string | null;

  @ApiProperty({ required: false, nullable: true })
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

  @ApiProperty({ required: false, nullable: true })
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
