import { ApiProperty } from '@nestjs/swagger';

export class OnboardingResponseDto {
  @ApiProperty({
    description: 'UUID público de la solicitud',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  externalId: string;

  @ApiProperty()
  userId: number;

  @ApiProperty({ nullable: true })
  userProductId: number | null;

  @ApiProperty({ nullable: true })
  partnerId: number | null;

  @ApiProperty({ nullable: true })
  partnerCategoryId: number | null;

  @ApiProperty({ nullable: true })
  salesRepId: number | null;

  @ApiProperty({ nullable: true })
  businessName: string | null;

  @ApiProperty({ nullable: true })
  businessRelationId: number | null;

  @ApiProperty({ nullable: true })
  businessTypeName: string | null;

  @ApiProperty({ nullable: true })
  businessTypeCode: number | null;

  @ApiProperty({ nullable: true })
  businessAddress: string | null;

  @ApiProperty({ nullable: true })
  businessCity: string | null;

  @ApiProperty({ nullable: true })
  businessRentAmount: string | null;

  @ApiProperty({ nullable: true })
  numberOfLocations: number | null;

  @ApiProperty({ nullable: true })
  numberOfEmployees: number | null;

  @ApiProperty({ nullable: true })
  businessSeniorityId: number | null;

  @ApiProperty({ nullable: true })
  sectorExperience: string | null;

  @ApiProperty({ nullable: true })
  relationshipToBusiness: string | null;

  @ApiProperty({ nullable: true })
  monthlyIncome: string | null;

  @ApiProperty({ nullable: true })
  monthlyExpenses: string | null;

  @ApiProperty({ nullable: true })
  monthlyPurchases: string | null;

  @ApiProperty({ nullable: true })
  currentPurchases: string | null;

  @ApiProperty({ nullable: true })
  totalAssets: string | null;

  @ApiProperty({ nullable: true })
  requestedCreditLine: string | null;

  @ApiProperty()
  isCurrentClient: boolean;

  @ApiProperty()
  statusId: number;

  @ApiProperty({ nullable: true })
  submissionDate: string | null;

  @ApiProperty({ nullable: true })
  approvalDate: string | null;

  @ApiProperty({ nullable: true })
  rejectionReason: string | null;

  @ApiProperty({ nullable: true })
  creditStudyDate: string | null;

  @ApiProperty({ nullable: true })
  creditScore: string | null;

  @ApiProperty({ nullable: true })
  creditDecision: string | null;

  @ApiProperty({ nullable: true })
  approvedCreditLine: string | null;

  @ApiProperty({ nullable: true })
  analystReport: string | null;

  @ApiProperty({ nullable: true })
  riskProfile: string | null;

  @ApiProperty()
  privacyPolicyAccepted: boolean;

  @ApiProperty({ nullable: true })
  privacyPolicyDate: string | null;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
