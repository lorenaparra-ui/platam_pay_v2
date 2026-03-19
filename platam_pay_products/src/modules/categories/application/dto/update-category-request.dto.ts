import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export class UpdateCategoryRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  partner_id?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  delay_days?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  disbursement_fee_percent?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  discount_percentage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  interest_rate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  minimum_disbursement_fee?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  term_days?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  status_id?: number;
}
