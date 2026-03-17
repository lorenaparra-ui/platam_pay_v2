import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { PartnerCategoryDto } from "./category.dto";

/**
 * DTO de entrada para el flujo completo de creación de partner (event-driven).
 * Los archivos logo y coBrandingLogo se envían por multipart y se inyectan en el controller.
 */
export class CreatePartnerFullRequestDto {
  @ApiProperty({ example: "CO", maxLength: 10 })
  @IsString()
  @MaxLength(10)
  countryCode: string;

  @ApiProperty({ example: "Partner Legal SAS" })
  @IsString()
  @MaxLength(255)
  legalName: string;

  @ApiProperty({ example: "Partner Trade" })
  @IsString()
  @MaxLength(255)
  tradeName: string;

  @ApiProperty({ example: "PDP", maxLength: 10 })
  @IsString()
  @MaxLength(10)
  acronym: string;

  @ApiProperty({ example: "901548471" })
  @IsString()
  @MaxLength(50)
  taxId: string;

  @ApiProperty({ example: "alias-partner" })
  @IsString()
  @MaxLength(100)
  alias: string;

  @ApiProperty({ example: "1", description: "ID de ciudad" })
  @IsString()
  cityId: string;

  @ApiProperty()
  @IsString()
  businessAddress: string;

  @ApiProperty({ example: 2020 })
  @IsInt()
  @Min(1800)
  yearOfEstablishment: number;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: "CC" })
  @IsString()
  @MaxLength(20)
  documentType: string;

  @ApiProperty({ example: "123456789" })
  @IsString()
  @MaxLength(50)
  documentNumber: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @ApiProperty()
  @IsEmail()
  notificationEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  webhookUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  disbursementNotificationEmail?: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  sendSalesRepVoucher: boolean;

  @ApiPropertyOptional({ maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  primaryColor?: string;

  @ApiPropertyOptional({ maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  secondaryColor?: string;

  @ApiPropertyOptional({ maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  lightColor?: string;

  @ApiProperty({ type: [PartnerCategoryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartnerCategoryDto)
  categories: PartnerCategoryDto[];
}
