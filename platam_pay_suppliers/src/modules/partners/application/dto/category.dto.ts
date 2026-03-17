import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

/**
 * Categoría de crédito para el partner (términos, tasas, comisiones).
 */
export class PartnerCategoryDto {
  @ApiProperty({ example: "Standard", maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 30, description: "Días de plazo" })
  @IsInt()
  @Min(1)
  termDays: number;

  @ApiProperty({ example: 0, description: "Días de demora para desembolso" })
  @IsInt()
  @Min(0)
  delayDays: number;

  @ApiProperty({ example: 0.5, description: "Porcentaje de descuento" })
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;

  @ApiProperty({ example: 1.5, description: "Tasa de interés" })
  @IsNumber()
  @Min(0)
  interestRate: number;

  @ApiProperty({ example: 2.5, description: "Porcentaje de comisión de desembolso" })
  @IsNumber()
  @Min(0)
  disbursementFeePercent: number;

  @ApiProperty({ example: 1000, description: "Comisión mínima de desembolso" })
  @IsNumber()
  @Min(0)
  minimumDisbursementFee: number;
}
