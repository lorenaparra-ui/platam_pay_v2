import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const UUID_V4_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function trim_optional_string(v: unknown): string | null {
  if (v === null || v === undefined) {
    return null;
  }
  const t = String(v).trim();
  return t.length > 0 ? t : null;
}

interface BusinessCityPayloadShape {
  cityId?: string;
  cityExternalId?: string;
}

@ValidatorConstraint({ name: 'business_city_reference_v4', async: false })
class BusinessCityReferenceV4Constraint
  implements ValidatorConstraintInterface
{
  validate(business: unknown, _args: ValidationArguments): boolean {
    if (business === null || business === undefined || typeof business !== 'object') {
      return false;
    }
    const o = business as BusinessCityPayloadShape;
    const primary = trim_optional_string(o.cityId);
    const legacy = trim_optional_string(o.cityExternalId);
    const valid_primary =
      primary !== null && UUID_V4_RE.test(primary);
    const valid_legacy =
      legacy !== null && UUID_V4_RE.test(legacy);
    return valid_primary || valid_legacy;
  }

  defaultMessage(): string {
    return 'business requiere cityId (UUID v4) o cityExternalId legado con UUID v4.';
  }
}

/** Usuario operativo del partner. */
export class OperatingUserPayloadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ description: 'Tipo de documento (catálogo / código).' })
  @IsString()
  @IsNotEmpty()
  docType!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  docNumber!: string;

  @ApiPropertyOptional({
    nullable: true,
    description: 'Teléfono como texto (p. ej. E.164 o número local).',
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string | null;

  @ApiProperty()
  @IsEmail()
  email!: string;
}

export class LegalRepresentativePayloadDto {
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

  @ApiPropertyOptional({
    nullable: true,
    description: 'Teléfono como texto (p. ej. E.164 o número local).',
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string | null;

  @ApiProperty()
  @IsEmail()
  email!: string;
}

export class CreatePartnerBusinessPayloadDto {
  @ApiPropertyOptional({
    description:
      'UUID v4 de ciudad en catálogo transversal (contrato HTTP). Si aún migra desde cityExternalId, puede omitirse si envía el legado.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(36)
  cityId?: string;

  @ApiPropertyOptional({
    description:
      'Alias legado de cityId; mismo UUID v4. Preferir cityId en clientes nuevos.',
    deprecated: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(36)
  cityExternalId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  entityType!: string;

  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  businessAddress!: string;

  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  businessType!: string;

  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  legalName!: string;

  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  tradeName!: string;

  @ApiProperty({
    nullable: false,
    description: 'Identificación fiscal (NIT, etc.) como string; evitar number.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  taxId!: string;

  @ApiProperty({ nullable: false })
  @Type(() => Number)
  @IsInt()
  yearOfEstablishment!: number;

  @ApiProperty({ type: LegalRepresentativePayloadDto, nullable: false })
  @ValidateNested()
  @Type(() => LegalRepresentativePayloadDto)
  legalRepresentative!: LegalRepresentativePayloadDto;
}

export class CreatePartnerPartnerSectionPayloadDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  acronym?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    description:
      'URL inicial si no se sube archivo `logo`. Si hay archivo, el archivo tiene prioridad.',
  })
  @IsOptional()
  @IsString()
  logoUrl?: string | null;

  @ApiPropertyOptional({
    nullable: true,
    description:
      'URL inicial si no se sube `coBranding`. Si hay archivo, el archivo tiene prioridad.',
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

  @ApiPropertyOptional({
    description: 'Por defecto `false` si se omite.',
  })
  @IsOptional()
  @IsBoolean()
  sendSalesRepVoucher?: boolean;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsEmail()
  disbursementNotificationEmail?: string | null;
}

export class CreatePartnerBankAccountPayloadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bankEntity!: string;

  @ApiProperty({
    description: 'Cuenta como string; no usar number para evitar precisión.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  accountNumber!: string;
}

export class CreatePartnerCreditFacilityPayloadDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @ValidateIf(
    (o: CreatePartnerCreditFacilityPayloadDto) =>
      o.contractId !== null &&
      o.contractId !== undefined &&
      String(o.contractId).trim() !== '',
  )
  @IsUUID('4')
  contractId?: string | null;

  @ApiProperty({
    description:
      'Límite total: entero JSON o string decimal no negativo, sin notación científica. ' +
      'Se serializa a string hacia dominio/integraciones; convención monetaria: unidad mínima (p. ej. centavos) acordada con producto.',
  })
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
  @IsNotEmpty()
  @Matches(/^(0|[1-9]\d*)(\.\d+)?$/, {
    message:
      'totalLimit debe ser un número no negativo (número JSON o string decimal)',
  })
  totalLimit!: string;
}

export class PartnerCategoryPayloadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  discountPercentage!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  interestRate!: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  disbursementFeePercent?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  minimumDisbursementFee?: number | null;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  delayDays!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  termDays!: number;
}

export class CreatePartnerPayloadDto {
  @ApiProperty({ type: OperatingUserPayloadDto })
  @ValidateNested()
  @Type(() => OperatingUserPayloadDto)
  operatingUser!: OperatingUserPayloadDto;

  @ApiProperty({ type: CreatePartnerBusinessPayloadDto })
  @Validate(BusinessCityReferenceV4Constraint)
  @ValidateNested()
  @Type(() => CreatePartnerBusinessPayloadDto)
  business!: CreatePartnerBusinessPayloadDto;

  @ApiProperty({ type: CreatePartnerPartnerSectionPayloadDto })
  @ValidateNested()
  @Type(() => CreatePartnerPartnerSectionPayloadDto)
  partner!: CreatePartnerPartnerSectionPayloadDto;

  @ApiProperty({ type: CreatePartnerBankAccountPayloadDto })
  @ValidateNested()
  @Type(() => CreatePartnerBankAccountPayloadDto)
  bankAccount!: CreatePartnerBankAccountPayloadDto;

  @ApiProperty({ type: CreatePartnerCreditFacilityPayloadDto })
  @ValidateNested()
  @Type(() => CreatePartnerCreditFacilityPayloadDto)
  creditFacility!: CreatePartnerCreditFacilityPayloadDto;

  @ApiProperty({ type: [PartnerCategoryPayloadDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartnerCategoryPayloadDto)
  category!: PartnerCategoryPayloadDto[];

  @ApiPropertyOptional({
    description:
      'Sobrescribe PARTNER_ONBOARDING_DEFAULT_COUNTRY_CODE (p. ej. ISO 3166-1 alpha-2).',
  })
  @IsOptional()
  @IsString()
  @MaxLength(8)
  countryCode?: string | null;
}
