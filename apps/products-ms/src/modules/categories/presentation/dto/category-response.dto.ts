import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CategoryPublicFields } from '@modules/categories/application/mapping/category-public-fields.builder';

export class CategoryResponseDto {
  @ApiProperty()
  externalId: string;

  @ApiProperty()
  creditFacilityExternalId: string;

  @ApiPropertyOptional({ nullable: true })
  partnerExternalId: string | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  modality: string;

  @ApiProperty()
  discountPercentage: string;

  @ApiProperty()
  interestRate: string;

  @ApiPropertyOptional({ nullable: true })
  disbursementFeePercent: string | null;

  @ApiPropertyOptional({ nullable: true })
  minimumDisbursementFee: string | null;

  @ApiProperty()
  delayDays: number;

  @ApiProperty()
  termDays: number;

  @ApiProperty()
  installmentFrequency: string;

  @ApiProperty()
  installmentCount: number;

  @ApiProperty()
  initialPaymentPct: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static from(fields: CategoryPublicFields): CategoryResponseDto {
    const dto = new CategoryResponseDto();
    dto.externalId = fields.external_id;
    dto.creditFacilityExternalId = fields.credit_facility_external_id;
    dto.partnerExternalId = fields.partner_external_id;
    dto.name = fields.name;
    dto.modality = fields.modality;
    dto.discountPercentage = fields.discount_percentage;
    dto.interestRate = fields.interest_rate;
    dto.disbursementFeePercent = fields.disbursement_fee_percent;
    dto.minimumDisbursementFee = fields.minimum_disbursement_fee;
    dto.delayDays = fields.delay_days;
    dto.termDays = fields.term_days;
    dto.installmentFrequency = fields.installment_frequency;
    dto.installmentCount = fields.installment_count;
    dto.initialPaymentPct = fields.initial_payment_pct;
    dto.state = fields.state;
    dto.createdAt = fields.created_at;
    dto.updatedAt = fields.updated_at;
    return dto;
  }
}
