import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * DTO de entrada para crear una solicitud de crédito BNPL.
 * Montos en centavos/unidad mínima.
 */
export class CreateCreditApplicationBnplRequestDto {
  @ApiProperty({ example: 1, description: 'ID del usuario' })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiPropertyOptional({ example: 2, description: 'ID del producto de usuario' })
  @IsOptional()
  @IsInt()
  @Min(0)
  userProductId?: number | null;

  @ApiPropertyOptional({ example: 3, description: 'ID del partner' })
  @IsOptional()
  @IsInt()
  @Min(0)
  partnerId?: number | null;

  @ApiPropertyOptional({ example: 1, description: 'ID de categoría del partner' })
  @IsOptional()
  @IsInt()
  @Min(0)
  partnerCategoryId?: number | null;

  @ApiPropertyOptional({ example: 5, description: 'ID del representante de ventas' })
  @IsOptional()
  @IsInt()
  @Min(0)
  salesRepId?: number | null;

  @ApiPropertyOptional({ example: 10, description: 'ID del negocio' })
  @IsOptional()
  @IsInt()
  @Min(0)
  businessId?: number | null;

  @ApiPropertyOptional({ example: 3, description: 'Número de sucursales' })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfLocations?: number | null;

  @ApiPropertyOptional({ example: 15, description: 'Número de empleados' })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfEmployees?: number | null;

  @ApiPropertyOptional({ example: '5-10', description: 'Antigüedad del negocio' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  businessSeniority?: string | null;

  @ApiPropertyOptional({ example: '5+', description: 'Experiencia en el sector' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  sectorExperience?: string | null;

  @ApiPropertyOptional({ example: 120, description: 'M² local bandera' })
  @IsOptional()
  @IsInt()
  @Min(0)
  businessFlagshipM2?: number | null;

  @ApiPropertyOptional({ example: true, description: '¿Tiene alquiler?' })
  @IsOptional()
  @IsBoolean()
  businessHasRent?: boolean | null;

  @ApiPropertyOptional({ example: 500000, description: 'Monto alquiler (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  businessRentAmount?: number | null;

  @ApiPropertyOptional({ example: 2000000, description: 'Ingresos mensuales (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyIncome?: number | null;

  @ApiPropertyOptional({ example: 800000, description: 'Gastos mensuales (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyExpenses?: number | null;

  @ApiPropertyOptional({ example: 1500000, description: 'Compras mensuales (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyPurchases?: number | null;

  @ApiPropertyOptional({ example: 300000, description: 'Compras actuales (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentPurchases?: number | null;

  @ApiPropertyOptional({ example: 10000000, description: 'Activos totales (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAssets?: number | null;

  @ApiPropertyOptional({ example: 5000000, description: 'Línea de crédito solicitada (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  requestedCreditLine?: number | null;

  @ApiPropertyOptional({ example: false, description: '¿Es cliente actual?' })
  @IsOptional()
  @IsBoolean()
  isCurrentClient?: boolean;

  @ApiProperty({ example: 1, description: 'ID de estado' })
  @IsInt()
  @Min(1)
  statusId: number;

  @ApiPropertyOptional({ description: 'Fecha de envío' })
  @IsOptional()
  submissionDate?: Date | null;

  @ApiPropertyOptional({ description: 'Fecha de aprobación' })
  @IsOptional()
  approvalDate?: Date | null;

  @ApiPropertyOptional({ example: 'Documentación incompleta', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  rejectionReason?: string | null;

  @ApiPropertyOptional({ description: 'Fecha de estudio de crédito' })
  @IsOptional()
  creditStudyDate?: Date | null;

  @ApiPropertyOptional({ example: 750.5, description: 'Puntaje de crédito' })
  @IsOptional()
  @IsNumber()
  creditScore?: number | null;

  @ApiPropertyOptional({ example: 'APPROVED', description: 'Decisión de crédito' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  creditDecision?: string | null;

  @ApiPropertyOptional({ example: 4000000, description: 'Línea aprobada (centavos)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  approvedCreditLine?: number | null;

  @ApiPropertyOptional({ description: 'Informe del analista' })
  @IsOptional()
  @IsString()
  analystReport?: string | null;

  @ApiPropertyOptional({ example: 'MEDIUM', description: 'Perfil de riesgo' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  riskProfile?: string | null;

  @ApiPropertyOptional({ example: true, description: 'Política de privacidad aceptada' })
  @IsOptional()
  @IsBoolean()
  privacyPolicyAccepted?: boolean;

  @ApiPropertyOptional({ description: 'Fecha de aceptación de política de privacidad' })
  @IsOptional()
  privacyPolicyDate?: Date | null;
}
