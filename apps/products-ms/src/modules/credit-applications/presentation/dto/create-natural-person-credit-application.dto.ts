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

/**
 * Cuerpo POST alineado con `createCreditApplicationSchema` del frontend (persona natural).
 */
export class CreateNaturalPersonCreditApplicationDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  birthDate?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessAddress?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  businessFlagshipM2?: number | null;

  @ApiProperty({ description: 'Nombre del negocio' })
  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @ApiPropertyOptional({ description: 'Arriendo mensual (si aplica)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  businessRentAmount?: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessSeniority?: string | null;

  @ApiProperty({ description: 'Tipo de negocio' })
  @IsString()
  @IsNotEmpty()
  businessType!: string;

  @ApiPropertyOptional({ nullable: true, description: 'UUID v4 de la ciudad' })
  @IsOptional()
  @IsUUID('4')
  cityId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentPurchases?: number | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  docNumber!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  docType!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyExpenses?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyIncome?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyPurchases?: number;

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

  @ApiProperty({ description: 'Identificador externo del partner (UUID)' })
  @IsString()
  @IsNotEmpty()
  partnerId!: string;

  @ApiProperty({
    description:
      'Identificador externo (UUID, `sales_representatives.external_id`) del representante de ventas',
  })
  @IsUUID('4')
  salesRepId!: string;

  @ApiProperty({ description: 'Aceptación explícita de la política de privacidad' })
  @IsBoolean()
  privacyPolicyAccepted!: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  relationshipToBusiness?: string | null;

  @ApiProperty({ description: 'Cupo solicitado (p. ej. centavos COP)' })
  @IsNumber()
  @Min(0)
  requestedCreditLine!: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAssets?: number | null;
}
