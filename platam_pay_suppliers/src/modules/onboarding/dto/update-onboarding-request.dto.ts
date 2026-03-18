import { ApiProperty } from '@nestjs/swagger';

export class UpdateOnboardingRequestDto {
  @ApiProperty({ required: false })
  userId?: number;

  @ApiProperty({ nullable: true, required: false })
  userProductId?: number | null;

  @ApiProperty({ nullable: true, required: false })
  partnerId?: number | null;

  @ApiProperty({ nullable: true, required: false })
  partnerCategoryId?: number | null;

  @ApiProperty({ nullable: true, required: false })
  salesRepId?: number | null;

  @ApiProperty({ nullable: true, required: false })
  businessName?: string | null;

  @ApiProperty({ nullable: true, required: false })
  businessRelationId?: number | null;

  @ApiProperty({ nullable: true, required: false })
  businessTypeName?: string | null;

  @ApiProperty({ nullable: true, required: false })
  businessTypeCode?: number | null;

  @ApiProperty({ nullable: true, required: false })
  businessAddress?: string | null;

  @ApiProperty({ nullable: true, required: false })
  businessCity?: string | null;

  @ApiProperty({ nullable: true, required: false })
  businessRentAmount?: string | null;

  @ApiProperty({ nullable: true, required: false })
  numberOfLocations?: number | null;

  @ApiProperty({ nullable: true, required: false })
  numberOfEmployees?: number | null;

  @ApiProperty({ nullable: true, required: false })
  businessSeniorityId?: number | null;

  @ApiProperty({ nullable: true, required: false })
  sectorExperience?: string | null;

  @ApiProperty({ nullable: true, required: false })
  relationshipToBusiness?: string | null;

  @ApiProperty({ nullable: true, required: false })
  monthlyIncome?: string | null;

  @ApiProperty({ nullable: true, required: false })
  monthlyExpenses?: string | null;

  @ApiProperty({ nullable: true, required: false })
  monthlyPurchases?: string | null;

  @ApiProperty({ nullable: true, required: false })
  currentPurchases?: string | null;

  @ApiProperty({ nullable: true, required: false })
  totalAssets?: string | null;

  @ApiProperty({ nullable: true, required: false })
  requestedCreditLine?: string | null;

  @ApiProperty({ required: false })
  isCurrentClient?: boolean;

  @ApiProperty({ required: false })
  statusId?: number;

  @ApiProperty({ required: false, nullable: true })
  submissionDate?: Date | null;

  @ApiProperty({ required: false, nullable: true })
  approvalDate?: Date | null;

  @ApiProperty({ required: false, nullable: true })
  rejectionReason?: string | null;

  @ApiProperty({ required: false, nullable: true })
  creditStudyDate?: Date | null;

  @ApiProperty({ required: false, nullable: true })
  creditScore?: string | null;

  @ApiProperty({ required: false, nullable: true })
  creditDecision?: string | null;

  @ApiProperty({ required: false, nullable: true })
  approvedCreditLine?: string | null;

  @ApiProperty({ required: false, nullable: true })
  analystReport?: string | null;

  @ApiProperty({ required: false, nullable: true })
  riskProfile?: string | null;

  @ApiProperty({ required: false })
  privacyPolicyAccepted?: boolean;

  @ApiProperty({ required: false, nullable: true })
  privacyPolicyDate?: Date | null;
}
