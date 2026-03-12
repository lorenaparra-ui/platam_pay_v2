import { ApiProperty } from "@nestjs/swagger";
import { CreditApplicationBnpl } from "../../domain/models/credit-application-bnpl.model";

export class CreditApplicationBnplResponseDto {
  @ApiProperty()
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
  businessId: number | null;

  @ApiProperty({ nullable: true })
  numberOfLocations: number | null;

  @ApiProperty({ nullable: true })
  numberOfEmployees: number | null;

  @ApiProperty({ nullable: true })
  businessSeniorityId: number | null;

  @ApiProperty({ nullable: true })
  sectorExperience: string | null;

  @ApiProperty({ nullable: true })
  businessFlagshipM2: number | null;

  @ApiProperty({ nullable: true })
  businessHasRent: boolean | null;

  @ApiProperty({ nullable: true })
  businessRentAmount: number | null;

  @ApiProperty({ nullable: true })
  monthlyIncome: number | null;

  @ApiProperty({ nullable: true })
  monthlyExpenses: number | null;

  @ApiProperty({ nullable: true })
  monthlyPurchases: number | null;

  @ApiProperty({ nullable: true })
  currentPurchases: number | null;

  @ApiProperty({ nullable: true })
  totalAssets: number | null;

  @ApiProperty({ nullable: true })
  requestedCreditLine: number | null;

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
  approvedCreditLine: number | null;

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

  static fromDomain(model: CreditApplicationBnpl): CreditApplicationBnplResponseDto {
    const dto = new CreditApplicationBnplResponseDto();
    dto.externalId = model.externalId;
    dto.userId = model.userId;
    dto.userProductId = model.userProductId;
    dto.partnerId = model.partnerId;
    dto.partnerCategoryId = model.partnerCategoryId;
    dto.salesRepId = model.salesRepId;
    dto.businessId = model.businessId;
    dto.numberOfLocations = model.numberOfLocations;
    dto.numberOfEmployees = model.numberOfEmployees;
    dto.businessSeniorityId = model.businessSeniorityId;
    dto.sectorExperience = model.sectorExperience;
    dto.businessFlagshipM2 = model.businessFlagshipM2;
    dto.businessHasRent = model.businessHasRent;
    dto.businessRentAmount = model.businessRentAmount;
    dto.monthlyIncome = model.monthlyIncome;
    dto.monthlyExpenses = model.monthlyExpenses;
    dto.monthlyPurchases = model.monthlyPurchases;
    dto.currentPurchases = model.currentPurchases;
    dto.totalAssets = model.totalAssets;
    dto.requestedCreditLine = model.requestedCreditLine;
    dto.isCurrentClient = model.isCurrentClient;
    dto.statusId = model.statusId;
    dto.submissionDate = model.submissionDate?.toISOString() ?? null;
    dto.approvalDate = model.approvalDate?.toISOString() ?? null;
    dto.rejectionReason = model.rejectionReason;
    dto.creditStudyDate = model.creditStudyDate?.toISOString() ?? null;
    dto.creditScore = model.creditScore;
    dto.creditDecision = model.creditDecision;
    dto.approvedCreditLine = model.approvedCreditLine;
    dto.analystReport = model.analystReport;
    dto.riskProfile = model.riskProfile;
    dto.privacyPolicyAccepted = model.privacyPolicyAccepted;
    dto.privacyPolicyDate = model.privacyPolicyDate?.toISOString() ?? null;
    dto.createdAt = model.createdAt.toISOString();
    dto.updatedAt = model.updatedAt.toISOString();
    return dto;
  }
}
