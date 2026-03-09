import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
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
import { CreatePartnerCategoryRequestDto } from "@partner-categories/application/dto/create-partner-category-request.dto";

export class CreatePartnerRequestDto {
  @ApiProperty({
    example: 42,
    description: "ID interno del negocio asociado",
  })
  @IsInt()
  @Min(1)
  businessId: number;

  @ApiProperty({
    example: "PDP",
    description: "Acronimo del partner",
    maxLength: 10,
  })
  @IsString()
  @MaxLength(10)
  acronym: string;

  @ApiPropertyOptional({
    example: "https://cdn.platam.com/partners/logo.png",
    description: "URL del logo principal",
  })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({
    example: "https://cdn.platam.com/partners/cobranding-logo.png",
    description: "URL del logo co-branding",
  })
  @IsOptional()
  @IsUrl()
  coBrandingLogoUrl?: string;

  @ApiPropertyOptional({
    example: "#123456",
    description: "Color primario del partner",
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  primaryColor?: string;

  @ApiPropertyOptional({
    example: "#654321",
    description: "Color secundario del partner",
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  secondaryColor?: string;

  @ApiPropertyOptional({
    example: "#f5f5f5",
    description: "Color claro del partner",
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  lightColor?: string;

  @ApiPropertyOptional({
    example: "Sales Rep",
    description: "Nombre del rol singular para vendedores",
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  salesRepRoleName?: string;

  @ApiPropertyOptional({
    example: "Sales Reps",
    description: "Nombre del rol plural para vendedores",
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  salesRepRoleNamePlural?: string;

  @ApiPropertyOptional({
    example: "ops@partner.com",
    description: "Email de notificaciones",
  })
  @IsOptional()
  @IsEmail()
  notificationEmail?: string;

  @ApiPropertyOptional({
    example: "https://partner.com/webhooks/platam",
    description: "URL de webhook del partner",
  })
  @IsOptional()
  @IsUrl()
  webhookUrl?: string;

  @ApiPropertyOptional({
    example: false,
    description: "Indica si se envia voucher al sales rep",
  })
  @IsOptional()
  @IsBoolean()
  sendSalesRepVoucher?: boolean;

  @ApiPropertyOptional({
    example: "payouts@partner.com",
    description: "Email para notificaciones de desembolso",
  })
  @IsOptional()
  @IsEmail()
  disbursementNotificationEmail?: string;

  @ApiPropertyOptional({
    example: 10,
    description: "ID interno del representante por defecto",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  defaultRepId?: number;

  @ApiPropertyOptional({
    example: 3,
    description: "ID interno de categoria por defecto",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  defaultCategoryId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: "ID interno de estado",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  statusId?: number;

  @ApiPropertyOptional({
    type: [CreatePartnerCategoryRequestDto],
    description: "Categorias a crear en el mismo flujo del partner",
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePartnerCategoryRequestDto)
  @ArrayMinSize(1)
  categories?: CreatePartnerCategoryRequestDto[];

  @ApiPropertyOptional({
    example: 0,
    description:
      "Indice de la categoria enviada en categories que se marcara como predeterminada",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  defaultCategoryIndex?: number;
}
