import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class CreateCategoryRequestDto {
  @ApiProperty({ example: 1, description: "ID interno de la línea de crédito" })
  @IsInt()
  @Min(1)
  credit_facility_id: number;

  @ApiPropertyOptional({ example: 2, description: "ID de partner (opcional)" })
  @IsOptional()
  @IsInt()
  @Min(1)
  partner_id?: number | null;

  @ApiProperty({ example: "Retail estándar", maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 0, description: "Días de gracia" })
  @IsInt()
  @Min(0)
  delay_days: number;

  @ApiPropertyOptional({
    example: "0.0150",
    description: "Comisión desembolso (decimal como string)",
  })
  @IsOptional()
  @IsNumberString()
  disbursement_fee_percent?: string | null;

  @ApiProperty({ example: "0.0500", description: "Descuento (decimal string)" })
  @IsNumberString()
  discount_percentage: string;

  @ApiProperty({ example: "0.0200", description: "Tasa (decimal string)" })
  @IsNumberString()
  interest_rate: string;

  @ApiPropertyOptional({
    example: "10000.0000",
    description: "Comisión mínima desembolso",
  })
  @IsOptional()
  @IsNumberString()
  minimum_disbursement_fee?: string | null;

  @ApiProperty({ example: 30, description: "Plazo en días" })
  @IsInt()
  @Min(1)
  term_days: number;

  @ApiProperty({ example: 1, description: "ID de estado" })
  @IsInt()
  @Min(1)
  status_id: number;
}
