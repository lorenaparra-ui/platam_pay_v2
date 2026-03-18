import { Inject, Injectable } from "@nestjs/common";
import type {
  CreditApplicationRepositoryPort,
  CreditApplicationUpdateInput,
} from "../../domain/ports/credit-application.repository.port";
import { CREDIT_APPLICATION_REPOSITORY } from "../../domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../domain/models/credit-application.model";
import type { UpdateCreditApplicationRequestDto } from "../dto/update-credit-application-request.dto";

@Injectable()
export class UpdateCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly repository: CreditApplicationRepositoryPort,
  ) {}

  async run(
    externalId: string,
    dto: UpdateCreditApplicationRequestDto,
  ): Promise<CreditApplication | null> {
    const input: CreditApplicationUpdateInput = {};
    if (dto.personId !== undefined) input.personId = dto.personId;
    if (dto.partnerId !== undefined) input.partnerId = dto.partnerId;
    if (dto.partnerCategoryId !== undefined)
      input.partnerCategoryId = dto.partnerCategoryId;
    if (dto.businessId !== undefined) input.businessId = dto.businessId;
    if (dto.numberOfLocations !== undefined)
      input.numberOfLocations = dto.numberOfLocations;
    if (dto.numberOfEmployees !== undefined)
      input.numberOfEmployees = dto.numberOfEmployees;
    if (dto.businessSeniority !== undefined)
      input.businessSeniority = dto.businessSeniority;
    if (dto.sectorExperience !== undefined)
      input.sectorExperience = dto.sectorExperience;
    if (dto.businessFlagshipM2 !== undefined)
      input.businessFlagshipM2 = dto.businessFlagshipM2;
    if (dto.businessHasRent !== undefined)
      input.businessHasRent = dto.businessHasRent;
    if (dto.businessRentAmount !== undefined)
      input.businessRentAmount = dto.businessRentAmount;
    if (dto.monthlyIncome !== undefined)
      input.monthlyIncome = dto.monthlyIncome;
    if (dto.monthlyExpenses !== undefined)
      input.monthlyExpenses = dto.monthlyExpenses;
    if (dto.monthlyPurchases !== undefined)
      input.monthlyPurchases = dto.monthlyPurchases;
    if (dto.currentPurchases !== undefined)
      input.currentPurchases = dto.currentPurchases;
    if (dto.totalAssets !== undefined) input.totalAssets = dto.totalAssets;
    if (dto.requestedCreditLine !== undefined)
      input.requestedCreditLine = dto.requestedCreditLine;
    if (dto.isCurrentClient !== undefined)
      input.isCurrentClient = dto.isCurrentClient;
    if (dto.statusId != null) input.statusId = dto.statusId;
    if (dto.submissionDate !== undefined)
      input.submissionDate = dto.submissionDate;
    if (dto.approvalDate !== undefined) input.approvalDate = dto.approvalDate;
    if (dto.rejectionReason !== undefined)
      input.rejectionReason = dto.rejectionReason;
    if (dto.creditStudyDate !== undefined)
      input.creditStudyDate = dto.creditStudyDate;
    if (dto.creditScore !== undefined) input.creditScore = dto.creditScore;
    if (dto.creditDecision !== undefined)
      input.creditDecision = dto.creditDecision;
    if (dto.approvedCreditLine !== undefined)
      input.approvedCreditLine = dto.approvedCreditLine;
    if (dto.analystReport !== undefined)
      input.analystReport = dto.analystReport;
    if (dto.riskProfile !== undefined) input.riskProfile = dto.riskProfile;
    if (dto.privacyPolicyAccepted !== undefined)
      input.privacyPolicyAccepted = dto.privacyPolicyAccepted;
    if (dto.privacyPolicyDate !== undefined)
      input.privacyPolicyDate = dto.privacyPolicyDate;
    return this.repository.updateByExternalId(externalId, input);
  }
}
