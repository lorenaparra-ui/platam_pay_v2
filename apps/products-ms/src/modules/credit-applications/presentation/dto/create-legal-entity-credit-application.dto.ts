import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LegalEntityShareholderItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shareholderName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shareholderLastName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shareholderDocType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shareholderDocNumber!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  shareholderPercent?: string | null;
}

/**
 * Body compartido por POST /credit-applications/legal-entity/async (público y privado).
 *
 * Diferencias entre flujos:
 *  - Público  → envía `privacyPolicyAccepted: true`; omite `partnerCategoryIds`
 *               (el sistema asigna las categorías con `is_default = true` del partner).
 *  - Privado  → envía `partnerCategoryIds` (mín. 1); puede omitir `privacyPolicyAccepted`.
 */
export class CreateLegalEntityCreditApplicationDto {
  // ── Partner + representante de ventas ───────────────────────────────────
  @ApiProperty({ description: 'UUID externo del partner' })
  @IsUUID('4')
  partnerId!: string;

  @ApiProperty({ description: 'UUID externo del representante de ventas' })
  @IsUUID('4')
  salesRepId!: string;

  // ── Datos de la empresa ─────────────────────────────────────────────────
  @ApiProperty({ description: 'Razón social' })
  @IsString()
  @IsNotEmpty()
  legalName!: string;

  @ApiProperty({ description: 'NIT sin dígito de verificación' })
  @IsString()
  @IsNotEmpty()
  taxId!: string;

  @ApiPropertyOptional({ nullable: true, description: 'UUID v4 de la ciudad' })
  @IsOptional()
  @IsUUID('4')
  cityId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessAddress?: string | null;

  @ApiProperty({ description: 'Correo de contacto de la empresa' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Año de constitución (YYYY)' })
  @IsString()
  @IsNotEmpty()
  yearOfEstablishment!: string;

  @ApiProperty({ description: 'Cupo de crédito solicitado' })
  @IsNumber()
  @Min(0)
  requestedCreditLine!: number;

  // ── Representante legal (persona) ────────────────────────────────────────
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  docType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  docNumber!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiPropertyOptional({ nullable: true, description: 'Dirección del representante legal' })
  @IsOptional()
  @IsString()
  legalRepAddress?: string | null;

  // ── Datos del negocio ───────────────────────────────────────────────────
  @ApiProperty({ description: 'Nombre comercial' })
  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @ApiProperty({ description: 'Tipo de negocio (código CIIU)' })
  @IsString()
  @IsNotEmpty()
  businessType!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessSeniority?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfLocations?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberOfEmployees?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  businessFlagshipM2?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  businessRentAmount?: number | null;

  // ── Información financiera ───────────────────────────────────────────────
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

  // ── Accionistas ──────────────────────────────────────────────────────────
  @ApiProperty({ type: [LegalEntityShareholderItemDto], description: 'Mínimo 1 accionista' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LegalEntityShareholderItemDto)
  shareholders!: LegalEntityShareholderItemDto[];

  // ── Opinión del representante de ventas (privado) ────────────────────────
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  salesRepKnowledgeTime?: string | null;

  @ApiPropertyOptional({ nullable: true, minimum: 1, maximum: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  salesRepConfidence?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salesRepSuggestedLimit?: number | null;

  // ── Diferenciadores públic vs privado ────────────────────────────────────
  @ApiPropertyOptional({ description: 'Requerido en flujo público' })
  @IsOptional()
  @IsBoolean()
  privacyPolicyAccepted?: boolean;

  @ApiPropertyOptional({
    type: [String],
    description: 'UUIDs de categorías (flujo sales rep). Omitir en flujo público → se usan las categorías default del partner.',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  partnerCategoryIds?: string[] | null;
}
