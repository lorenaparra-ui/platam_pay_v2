import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsUUID,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from "class-validator";

export class CreatePartnerCategoryRequestDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "UUID publico del partner propietario de la categoria",
  })
  @IsUUID("4")
  partnerExternalId: string;

  @ApiProperty({
    example: "Electro",
    description: "Nombre de la categoria",
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: "0.1500",
    description: "Porcentaje de descuento en formato decimal",
  })
  @IsString()
  @Matches(/^\d{1,2}(\.\d{1,4})?$/)
  discountPercentage: string;

  @ApiProperty({
    example: "0.0200",
    description: "Tasa de interes en formato decimal",
  })
  @IsString()
  @Matches(/^\d{1,2}(\.\d{1,4})?$/)
  interestRate: string;

  @ApiPropertyOptional({
    example: "0.0100",
    description: "Comision de desembolso en formato decimal",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,2}(\.\d{1,4})?$/)
  disbursementFeePercent?: string;

  @ApiPropertyOptional({
    example: "25000",
    description: "Comision minima de desembolso en centavos o unidad menor",
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  minimumDisbursementFee?: string;

  @ApiProperty({
    example: 3,
    description: "Dias de retraso (> 0)",
  })
  @IsInt()
  @Min(1)
  delayDays: number;

  @ApiProperty({
    example: 30,
    description: "Plazo en dias",
  })
  @IsInt()
  @Min(1)
  termDays: number;

  @ApiPropertyOptional({
    example: 4,
    description: "ID interno de estado para partner_categories",
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  statusId?: number;
}
