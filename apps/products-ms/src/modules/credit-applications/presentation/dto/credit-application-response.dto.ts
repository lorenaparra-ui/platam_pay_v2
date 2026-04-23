import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreditApplicationStatus } from '@platam/shared';
import type { CreditApplicationPublicFields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';

export class CreditApplicationResponseDto implements CreditApplicationPublicFields {
  @ApiProperty()
  externalId!: string;

  @ApiPropertyOptional({ nullable: true })
  personId!: number | null;

  @ApiPropertyOptional({ nullable: true })
  partnerId!: number | null;

  @ApiPropertyOptional({ nullable: true })
  partnerCategoryId!: number | null;

  @ApiPropertyOptional({ nullable: true })
  businessId!: number | null;

  @ApiPropertyOptional({ nullable: true })
  salesRepresentativeId!: number | null;

  @ApiPropertyOptional({ nullable: true })
  numberOfLocations!: number | null;

  @ApiPropertyOptional({ nullable: true })
  numberOfEmployees!: number | null;

  @ApiPropertyOptional({ nullable: true })
  businessSeniority!: string | null;

  @ApiPropertyOptional({ nullable: true })
  sectorExperience!: string | null;

  @ApiPropertyOptional({ nullable: true })
  businessFlagshipM2!: number | null;

  @ApiPropertyOptional({ nullable: true })
  businessHasRent!: boolean | null;

  @ApiPropertyOptional({ nullable: true })
  businessRentAmount!: number | null;

  @ApiPropertyOptional({ nullable: true })
  monthlyIncome!: number | null;

  @ApiPropertyOptional({ nullable: true })
  monthlyExpenses!: number | null;

  @ApiPropertyOptional({ nullable: true })
  monthlyPurchases!: number | null;

  @ApiPropertyOptional({ nullable: true })
  currentPurchases!: number | null;

  @ApiPropertyOptional({ nullable: true })
  totalAssets!: number | null;

  @ApiPropertyOptional({ nullable: true })
  requestedCreditLine!: number | null;

  @ApiProperty()
  isCurrentClient!: boolean;

  @ApiProperty({ enum: CreditApplicationStatus })
  status!: CreditApplicationStatus;

  @ApiPropertyOptional({ nullable: true })
  submissionDate!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  approvalDate!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  rejectionReason!: string | null;

  @ApiPropertyOptional({ nullable: true })
  creditStudyDate!: Date | null;

  @ApiPropertyOptional({ nullable: true })
  creditScore!: string | null;

  @ApiPropertyOptional({ nullable: true })
  creditDecision!: string | null;

  @ApiPropertyOptional({ nullable: true })
  approvedCreditLine!: number | null;

  @ApiPropertyOptional({ nullable: true })
  analystReport!: string | null;

  @ApiPropertyOptional({ nullable: true })
  riskProfile!: string | null;

  @ApiProperty()
  privacyPolicyAccepted!: boolean;

  @ApiPropertyOptional({ nullable: true })
  privacyPolicyDate!: Date | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static from(fields: CreditApplicationPublicFields): CreditApplicationResponseDto {
    return Object.assign(new CreditApplicationResponseDto(), fields);
  }
}
