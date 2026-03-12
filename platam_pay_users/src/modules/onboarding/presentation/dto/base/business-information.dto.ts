import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class BusinessInformationDto {
  @ApiProperty({ example: 'Mi Negocio SAS' })
  @IsString()
  businessName: string;

  @ApiProperty({ example: 'retail' })
  @IsString()
  businessType: string;

  @ApiProperty({ example: 'Bogotá' })
  @IsString()
  businessCity: string;

  @ApiProperty({ example: 'Calle 1 # 2-3' })
  @IsString()
  businessAddress: string;

  @ApiProperty({ example: 10, minimum: 0 })
  @IsNumber()
  @Min(0)
  numberOfEmployees: number;

  @ApiProperty({ example: 2, minimum: 0 })
  @IsNumber()
  @Min(0)
  numberOfLocations: number;

  @ApiProperty({ example: '1-3' })
  @IsString()
  seniority: string;

  @ApiPropertyOptional({ example: 150, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  flagshipM2?: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasRent: boolean;

  @ValidateIf((o) => o.hasRent === true)
  @IsNumber()
  @Min(0)
  rentAmount?: number;
}
