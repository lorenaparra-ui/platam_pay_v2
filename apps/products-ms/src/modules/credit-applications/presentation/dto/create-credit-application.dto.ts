import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCreditApplicationDto {
  @ApiProperty({ description: 'Teléfono del solicitante' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ description: 'Correo electrónico del solicitante' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Tipo de documento (catálogo)' })
  @IsString()
  @IsNotEmpty()
  docType!: string;

  @ApiProperty({ description: 'Número de documento' })
  @IsString()
  @IsNotEmpty()
  docNumber!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ description: 'Nombre del negocio' })
  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @ApiProperty({ description: 'Tipo de negocio' })
  @IsString()
  @IsNotEmpty()
  businessType!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  relationshipToBusiness?: string | null;

  @ApiPropertyOptional({ nullable: true, description: 'UUID v4 de la ciudad (catálogo transversal)' })
  @IsOptional()
  @IsUUID('4')
  cityId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessAddress?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessSeniority?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfEmployees?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfLocations?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  businessFlagshipM2?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsBoolean()
  businessHasRent?: boolean | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  businessRentAmount?: number | null;

  @ApiProperty({ description: 'Cupo solicitado en centavos (COP)' })
  @IsNumber()
  @Min(0)
  requestedCreditLine!: number;

  @ApiProperty()
  @IsBoolean()
  isCurrentClient!: boolean;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyPurchases?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentPurchases?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAssets?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyIncome?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyExpenses?: number | null;
}
