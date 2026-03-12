import { Inject, Injectable } from "@nestjs/common";
import {
  CREDIT_APPLICATION_BNPL_REPOSITORY,
  UpdateCreditApplicationBnplPayload,
} from "../../domain/ports/credit-application-bnpl.repository.port";
import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplResponseDto } from "../dto/credit-application-bnpl-response.dto";
import { UpdateCreditApplicationBnplRequestDto } from "../dto/update-credit-application-bnpl-request.dto";

function toDateOrNull(v: string | null | undefined): Date | null {
  if (v == null || v === "") return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

@Injectable()
export class UpdateCreditApplicationBnplUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_BNPL_REPOSITORY)
    private readonly repository: CreditApplicationBnplRepositoryPort,
  ) {}

  async execute(
    externalId: string,
    dto: UpdateCreditApplicationBnplRequestDto,
  ): Promise<CreditApplicationBnplResponseDto | null> {
    const payload: UpdateCreditApplicationBnplPayload = {};
    if (dto.userId !== undefined) payload.userId = dto.userId;
    if (dto.userProductId !== undefined) payload.userProductId = dto.userProductId;
    if (dto.partnerId !== undefined) payload.partnerId = dto.partnerId;
    if (dto.partnerCategoryId !== undefined) payload.partnerCategoryId = dto.partnerCategoryId;
    if (dto.salesRepId !== undefined) payload.salesRepId = dto.salesRepId;
    if (dto.businessId !== undefined) payload.businessId = dto.businessId;
    if (dto.numberOfLocations !== undefined) payload.numberOfLocations = dto.numberOfLocations;
    if (dto.numberOfEmployees !== undefined) payload.numberOfEmployees = dto.numberOfEmployees;
    if (dto.businessSeniorityId !== undefined) payload.businessSeniorityId = dto.businessSeniorityId;
    if (dto.sectorExperience !== undefined) payload.sectorExperience = dto.sectorExperience;
    if (dto.businessFlagshipM2 !== undefined) payload.businessFlagshipM2 = dto.businessFlagshipM2;
    if (dto.businessHasRent !== undefined) payload.businessHasRent = dto.businessHasRent;
    if (dto.businessRentAmount !== undefined) payload.businessRentAmount = dto.businessRentAmount;
    if (dto.monthlyIncome !== undefined) payload.monthlyIncome = dto.monthlyIncome;
    if (dto.monthlyExpenses !== undefined) payload.monthlyExpenses = dto.monthlyExpenses;
    if (dto.monthlyPurchases !== undefined) payload.monthlyPurchases = dto.monthlyPurchases;
    if (dto.currentPurchases !== undefined) payload.currentPurchases = dto.currentPurchases;
    if (dto.totalAssets !== undefined) payload.totalAssets = dto.totalAssets;
    if (dto.requestedCreditLine !== undefined) payload.requestedCreditLine = dto.requestedCreditLine;
    if (dto.isCurrentClient !== undefined) payload.isCurrentClient = dto.isCurrentClient;
    if (dto.statusId !== undefined) payload.statusId = dto.statusId;
    if (dto.submissionDate !== undefined) payload.submissionDate = toDateOrNull(dto.submissionDate);
    if (dto.approvalDate !== undefined) payload.approvalDate = toDateOrNull(dto.approvalDate);
    if (dto.rejectionReason !== undefined) payload.rejectionReason = dto.rejectionReason;
    if (dto.creditStudyDate !== undefined) payload.creditStudyDate = toDateOrNull(dto.creditStudyDate);
    if (dto.creditScore !== undefined) payload.creditScore = dto.creditScore;
    if (dto.creditDecision !== undefined) payload.creditDecision = dto.creditDecision;
    if (dto.approvedCreditLine !== undefined) payload.approvedCreditLine = dto.approvedCreditLine;
    if (dto.analystReport !== undefined) payload.analystReport = dto.analystReport;
    if (dto.riskProfile !== undefined) payload.riskProfile = dto.riskProfile;
    if (dto.privacyPolicyAccepted !== undefined) payload.privacyPolicyAccepted = dto.privacyPolicyAccepted;
    if (dto.privacyPolicyDate !== undefined) payload.privacyPolicyDate = toDateOrNull(dto.privacyPolicyDate);

    const entity = await this.repository.updateByExternalId(externalId, payload);
    return entity ? CreditApplicationBnplResponseDto.fromDomain(entity) : null;
  }
}
