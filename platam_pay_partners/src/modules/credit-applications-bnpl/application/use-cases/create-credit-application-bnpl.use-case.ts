import { Inject, Injectable } from "@nestjs/common";
import {
  CREDIT_APPLICATION_BNPL_REPOSITORY,
  CreateCreditApplicationBnplPayload,
} from "../../domain/ports/credit-application-bnpl.repository.port";
import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplResponseDto } from "../dto/credit-application-bnpl-response.dto";
import { CreateCreditApplicationBnplRequestDto } from "../dto/create-credit-application-bnpl-request.dto";

function toDateOrNull(v: string | null | undefined): Date | null {
  if (v == null || v === "") return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

@Injectable()
export class CreateCreditApplicationBnplUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_BNPL_REPOSITORY)
    private readonly repository: CreditApplicationBnplRepositoryPort,
  ) {}

  async execute(dto: CreateCreditApplicationBnplRequestDto): Promise<CreditApplicationBnplResponseDto> {
    const payload: CreateCreditApplicationBnplPayload = {
      userId: dto.userId,
      userProductId: dto.userProductId ?? null,
      partnerId: dto.partnerId ?? null,
      partnerCategoryId: dto.partnerCategoryId ?? null,
      salesRepId: dto.salesRepId ?? null,
      businessId: dto.businessId ?? null,
      numberOfLocations: dto.numberOfLocations ?? null,
      numberOfEmployees: dto.numberOfEmployees ?? null,
      businessSeniorityId: dto.businessSeniorityId ?? null,
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
      statusId: dto.statusId ?? undefined,
      submissionDate: toDateOrNull(dto.submissionDate ?? null),
      approvalDate: toDateOrNull(dto.approvalDate ?? null),
      rejectionReason: dto.rejectionReason ?? null,
      creditStudyDate: toDateOrNull(dto.creditStudyDate ?? null),
      creditScore: dto.creditScore ?? null,
      creditDecision: dto.creditDecision ?? null,
      approvedCreditLine: dto.approvedCreditLine ?? null,
      analystReport: dto.analystReport ?? null,
      riskProfile: dto.riskProfile ?? null,
      privacyPolicyAccepted: dto.privacyPolicyAccepted ?? false,
      privacyPolicyDate: toDateOrNull(dto.privacyPolicyDate ?? null),
    };
    const entity = await this.repository.create(payload);
    return CreditApplicationBnplResponseDto.fromDomain(entity);
  }
}
