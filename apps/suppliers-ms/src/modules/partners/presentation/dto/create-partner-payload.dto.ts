import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class PartnerCategoryPayloadDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  discountPercentage!: string;

  @IsString()
  @IsNotEmpty()
  interestRate!: string;

  @IsOptional()
  @IsString()
  disbursementFeePercent?: string | null;

  @IsOptional()
  @IsString()
  minimumDisbursementFee?: string | null;

  @Type(() => Number)
  @IsInt()
  delayDays!: number;

  @Type(() => Number)
  @IsInt()
  termDays!: number;
}

export class CreatePartnerPayloadDto {
  @IsOptional()
  @ValidateIf(
    (o: CreatePartnerPayloadDto) =>
      o.cityId !== null && o.cityId !== undefined && o.cityId !== '',
  )
  @IsUUID('4')
  cityId?: string | null;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  entityType!: string;

  @IsOptional()
  @IsString()
  businessName?: string | null;

  @IsOptional()
  @IsString()
  businessAddress?: string | null;

  @IsOptional()
  @IsString()
  businessType?: string | null;

  @IsOptional()
  @IsString()
  relationshipToBusiness?: string | null;

  @IsOptional()
  @IsString()
  legalName?: string | null;

  @IsOptional()
  @IsString()
  tradeName?: string | null;

  @IsOptional()
  @IsString()
  taxId?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearOfEstablishment?: number | null;

  @IsString()
  @IsNotEmpty()
  bankEntity!: string;

  @IsString()
  @IsNotEmpty()
  accountNumber!: string;

  @IsOptional()
  @IsString()
  acronym?: string | null;

  @IsOptional()
  @IsString()
  secondaryColor?: string | null;

  @IsOptional()
  @IsString()
  lightColor?: string | null;

  @IsOptional()
  @IsEmail()
  notificationEmail?: string | null;

  @IsOptional()
  @IsString()
  webhookUrl?: string | null;

  @IsBoolean()
  sendSalesRepVoucher!: boolean;

  @IsOptional()
  @IsEmail()
  disbursementNotificationEmail?: string | null;

  @IsOptional()
  @ValidateIf(
    (o: CreatePartnerPayloadDto) =>
      o.contractId !== null &&
      o.contractId !== undefined &&
      o.contractId !== '',
  )
  @IsUUID('4')
  contractId?: string | null;

  @IsUUID('4')
  statusId!: string;

  @IsString()
  @IsNotEmpty()
  totalLimit!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  countryCode?: string | null;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  docType!: string;

  @IsString()
  @IsNotEmpty()
  docNumber!: string;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartnerCategoryPayloadDto)
  categories?: PartnerCategoryPayloadDto[];
}
