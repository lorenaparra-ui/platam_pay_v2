import { Inject, Injectable } from "@nestjs/common";
import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
import { CREDIT_APPLICATION_REPOSITORY } from "../../domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../domain/models/credit-application.model";
import type { CreateCreditApplicationRequestDto } from "../dto/create-credit-application-request.dto";

@Injectable()
export class CreateCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly repository: CreditApplicationRepositoryPort,
  ) {}

  async run(
    dto: CreateCreditApplicationRequestDto,
  ): Promise<CreditApplication> {
    return this.repository.create({
      personId: dto.personId ?? null,
      partnerId: dto.partnerId ?? null,
      partnerCategoryId: dto.partnerCategoryId ?? null,
      businessId: dto.businessId ?? null,
      numberOfLocations: dto.numberOfLocations ?? null,
      numberOfEmployees: dto.numberOfEmployees ?? null,
      businessSeniority: dto.businessSeniority ?? null,
      sectorExperience: dto.sectorExperience ?? null,
      businessFlagshipM2: dto.businessFlagshipM2 ?? null,
      businessHasRent: dto.businessHasRent ?? null,
      businessRentAmount: dto.businessRentAmount ?? null,
      monthlyIncome: dto.monthlyIncome ?? null,
      monthlyExpenses: dto.monthlyExpenses ?? null,
      monthlyPurchases: dto.monthlyPurchases ?? null,
      currentPurchases: dto.currentPurchases ?? null,
      totalAssets: dto.totalAssets ?? null,
      requestedCreditLine: dto.requestedCreditLine ?? null,
      isCurrentClient: dto.isCurrentClient ?? false,
      statusId: dto.statusId,
      submissionDate: dto.submissionDate ?? null,
      approvalDate: dto.approvalDate ?? null,
      rejectionReason: dto.rejectionReason ?? null,
      creditStudyDate: dto.creditStudyDate ?? null,
      creditScore: dto.creditScore ?? null,
      creditDecision: dto.creditDecision ?? null,
      approvedCreditLine: dto.approvedCreditLine ?? null,
      analystReport: dto.analystReport ?? null,
      riskProfile: dto.riskProfile ?? null,
      privacyPolicyAccepted: dto.privacyPolicyAccepted ?? false,
      privacyPolicyDate: dto.privacyPolicyDate ?? null,
    });
  }
}
