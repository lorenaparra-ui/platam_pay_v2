import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CategoryResponseDto {
  @ApiProperty()
  external_id: string;

  @ApiProperty()
  credit_facility_id: number;

  @ApiPropertyOptional()
  partner_id: number | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  discount_percentage: string;

  @ApiProperty()
  interest_rate: string;

  @ApiPropertyOptional()
  disbursement_fee_percent: string | null;

  @ApiPropertyOptional()
  minimum_disbursement_fee: string | null;

  @ApiProperty()
  delay_days: number;

  @ApiProperty()
  term_days: number;

  @ApiProperty()
  status_id: number;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}
