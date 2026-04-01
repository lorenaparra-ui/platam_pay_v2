import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreditFacilitiesStatuses } from '@platam/shared';
import { PartnerCategoryPayloadDto } from './create-partner-payload.dto';

/**
 * PATCH multipart `payload` (JSON): todas las secciones raíz son opcionales.
 * Hoy solo se persisten cambios en `partner` y URLs de logo/coBranding (multipart o URLs en JSON);
 * enviar otras secciones con datos produce 501 hasta tener casos de uso/repositorio.
 */
export class UpdateOperatingUserPayloadDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  docType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  docNumber?: string;

  @ApiPropertyOptional({
    nullable: true,
    description: 'Teléfono como texto (mismo criterio que POST).',
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateLegalRepresentativePayloadDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  docType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  docNumber?: string;

  @ApiPropertyOptional({
    nullable: true,
    description: 'Teléfono como texto.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateBusinessPayloadDto {
  @ApiPropertyOptional({
    nullable: true,
    description:
      'UUID v4 ciudad (catálogo transversal). Parcial: solo si se actualiza ciudad.',
  })
  @IsOptional()
  @IsUUID('4')
  cityId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessName?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessAddress?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  businessType?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  legalName?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  tradeName?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  taxId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearOfEstablishment?: number | null;

  @ApiPropertyOptional({
    type: UpdateLegalRepresentativePayloadDto,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLegalRepresentativePayloadDto)
  legalRepresentative?: UpdateLegalRepresentativePayloadDto | null;
}

export class UpdatePartnerSectionPayloadDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  acronym?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    description:
      'Si se envía archivo `logo`, el archivo tiene prioridad sobre esta URL.',
  })
  @IsOptional()
  @IsString()
  logoUrl?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    description:
      'Si se envía archivo coBranding, el archivo tiene prioridad sobre esta URL.',
  })
  @IsOptional()
  @IsString()
  coBrandingLogoUrl?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  primaryColor?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  secondaryColor?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  lightColor?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsEmail()
  notificationEmail?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  webhookUrl?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  sendSalesRepVoucher?: boolean;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsEmail()
  disbursementNotificationEmail?: string | null;

  @ApiPropertyOptional({
    enum: CreditFacilitiesStatuses,
    description: 'Estado operativo del partner (`active` | `inactive`).',
  })
  @IsOptional()
  @IsIn([CreditFacilitiesStatuses.ACTIVE, CreditFacilitiesStatuses.INACTIVE])
  state?: CreditFacilitiesStatuses;
}

export class UpdateBankAccountPayloadDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bankEntity?: string;

  @ApiPropertyOptional({
    description: 'Cuenta como string (mismo criterio que POST).',
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  accountNumber?: string;
}

export class UpdateCreditFacilityPayloadDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @ValidateIf(
    (o: UpdateCreditFacilityPayloadDto) =>
      o.contractId !== null &&
      o.contractId !== undefined &&
      String(o.contractId).trim() !== '',
  )
  @IsUUID('4')
  contractId?: string | null;

  @ApiPropertyOptional({
    description:
      'Misma convención que POST (string no negativo tras normalización).',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
    if (typeof value === 'string') {
      return value.trim();
    }
    return String(value);
  })
  @IsString()
  @Matches(/^(0|[1-9]\d*)(\.\d+)?$/, {
    message:
      'totalLimit debe ser un número no negativo (número JSON o string decimal)',
  })
  totalLimit?: string;
}

export class UpdatePartnerPayloadDto {
  @ApiPropertyOptional({ type: UpdateOperatingUserPayloadDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateOperatingUserPayloadDto)
  operatingUser?: UpdateOperatingUserPayloadDto;

  @ApiPropertyOptional({ type: UpdateBusinessPayloadDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateBusinessPayloadDto)
  business?: UpdateBusinessPayloadDto;

  @ApiPropertyOptional({ type: UpdatePartnerSectionPayloadDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePartnerSectionPayloadDto)
  partner?: UpdatePartnerSectionPayloadDto;

  @ApiPropertyOptional({ type: UpdateBankAccountPayloadDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateBankAccountPayloadDto)
  bankAccount?: UpdateBankAccountPayloadDto;

  @ApiPropertyOptional({ type: UpdateCreditFacilityPayloadDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCreditFacilityPayloadDto)
  creditFacility?: UpdateCreditFacilityPayloadDto;

  @ApiPropertyOptional({ type: [PartnerCategoryPayloadDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartnerCategoryPayloadDto)
  category?: PartnerCategoryPayloadDto[];
}
