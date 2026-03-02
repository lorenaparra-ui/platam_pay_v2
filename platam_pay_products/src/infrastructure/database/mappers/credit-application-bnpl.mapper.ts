import type { CreditApplicationBnpl } from '../../../modules/credit-applications/domain/models/credit-application-bnpl.model';
import type { CreditApplicationBnplCreateInput } from '../../../modules/credit-applications/domain/ports/credit-application-bnpl.repository.port';
import { CreditApplicationBnplEntity } from '../entities/credit-application-bnpl.entity';

function toNumber(value: string | number | null | undefined): number | null {
  if (value == null) return null;
  return typeof value === 'string' ? Number(value) : value;
}

export class CreditApplicationBnplMapper {
  static toDomain(entity: CreditApplicationBnplEntity): CreditApplicationBnpl {
    return {
      id: Number(entity.id),
      externalId: entity.externalId,
      userId: Number(entity.userId),
      userProductId: toNumber(entity.userProductId),
      partnerId: toNumber(entity.partnerId),
      partnerCategoryId: toNumber(entity.partnerCategoryId),
      salesRepId: toNumber(entity.salesRepId),
      businessId: toNumber(entity.businessId),
      numberOfLocations: entity.numberOfLocations ?? null,
      numberOfEmployees: entity.numberOfEmployees ?? null,
      businessSeniority: entity.businessSeniority,
      sectorExperience: entity.sectorExperience,
      businessFlagshipM2: entity.businessFlagshipM2 ?? null,
      businessHasRent: entity.businessHasRent ?? null,
      businessRentAmount: entity.businessRentAmount != null ? Number(entity.businessRentAmount) : null,
      monthlyIncome: entity.monthlyIncome != null ? Number(entity.monthlyIncome) : null,
      monthlyExpenses: entity.monthlyExpenses != null ? Number(entity.monthlyExpenses) : null,
      monthlyPurchases: entity.monthlyPurchases != null ? Number(entity.monthlyPurchases) : null,
      currentPurchases: entity.currentPurchases != null ? Number(entity.currentPurchases) : null,
      totalAssets: entity.totalAssets != null ? Number(entity.totalAssets) : null,
      requestedCreditLine: entity.requestedCreditLine != null ? Number(entity.requestedCreditLine) : null,
      isCurrentClient: entity.isCurrentClient,
      statusId: Number(entity.statusId),
      submissionDate: entity.submissionDate ?? null,
      approvalDate: entity.approvalDate ?? null,
      rejectionReason: entity.rejectionReason,
      creditStudyDate: entity.creditStudyDate ?? null,
      creditScore: entity.creditScore != null ? Number(entity.creditScore) : null,
      creditDecision: entity.creditDecision,
      approvedCreditLine: entity.approvedCreditLine != null ? Number(entity.approvedCreditLine) : null,
      analystReport: entity.analystReport,
      riskProfile: entity.riskProfile,
      privacyPolicyAccepted: entity.privacyPolicyAccepted,
      privacyPolicyDate: entity.privacyPolicyDate ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(domain: CreditApplicationBnpl): CreditApplicationBnplEntity {
    const entity = new CreditApplicationBnplEntity();
    entity.id = domain.id;
    entity.userProductId = domain.userProductId;
    entity.partnerId = domain.partnerId;
    entity.partnerCategoryId = domain.partnerCategoryId;
    entity.salesRepId = domain.salesRepId;
    entity.businessId = domain.businessId;
    entity.numberOfLocations = domain.numberOfLocations;
    entity.numberOfEmployees = domain.numberOfEmployees;
    entity.businessSeniority = domain.businessSeniority;
    entity.sectorExperience = domain.sectorExperience;
    entity.businessFlagshipM2 = domain.businessFlagshipM2;
    entity.businessHasRent = domain.businessHasRent;
    entity.businessRentAmount = domain.businessRentAmount;
    entity.monthlyIncome = domain.monthlyIncome;
    entity.monthlyExpenses = domain.monthlyExpenses;
    entity.monthlyPurchases = domain.monthlyPurchases;
    entity.currentPurchases = domain.currentPurchases;
    entity.totalAssets = domain.totalAssets;
    entity.requestedCreditLine = domain.requestedCreditLine;
    entity.isCurrentClient = domain.isCurrentClient;
    entity.statusId = domain.statusId;
    entity.submissionDate = domain.submissionDate;
    entity.approvalDate = domain.approvalDate;
    entity.rejectionReason = domain.rejectionReason;
    entity.creditStudyDate = domain.creditStudyDate;
    entity.creditScore = domain.creditScore != null ? String(domain.creditScore) : null;
    entity.creditDecision = domain.creditDecision;
    entity.approvedCreditLine = domain.approvedCreditLine;
    entity.analystReport = domain.analystReport;
    entity.riskProfile = domain.riskProfile;
    entity.privacyPolicyAccepted = domain.privacyPolicyAccepted;
    entity.privacyPolicyDate = domain.privacyPolicyDate;
    return entity;
  }

  /** Crea entidad para INSERT (sin id/externalId/createdAt/updatedAt; los asigna la DB/TypeORM). */
  static toEntityFromCreateInput(
    input: CreditApplicationBnplCreateInput,
  ): CreditApplicationBnplEntity {
    const entity = new CreditApplicationBnplEntity();
    entity.userId = input.userId;
    entity.userProductId = input.userProductId ?? null;
    entity.partnerId = input.partnerId ?? null;
    entity.partnerCategoryId = input.partnerCategoryId ?? null;
    entity.salesRepId = input.salesRepId ?? null;
    entity.businessId = input.businessId ?? null;
    entity.numberOfLocations = input.numberOfLocations ?? null;
    entity.numberOfEmployees = input.numberOfEmployees ?? null;
    entity.businessSeniority = input.businessSeniority ?? null;
    entity.sectorExperience = input.sectorExperience ?? null;
    entity.businessFlagshipM2 = input.businessFlagshipM2 ?? null;
    entity.businessHasRent = input.businessHasRent ?? null;
    entity.businessRentAmount = input.businessRentAmount ?? null;
    entity.monthlyIncome = input.monthlyIncome ?? null;
    entity.monthlyExpenses = input.monthlyExpenses ?? null;
    entity.monthlyPurchases = input.monthlyPurchases ?? null;
    entity.currentPurchases = input.currentPurchases ?? null;
    entity.totalAssets = input.totalAssets ?? null;
    entity.requestedCreditLine = input.requestedCreditLine ?? null;
    entity.isCurrentClient = input.isCurrentClient ?? false;
    entity.statusId = input.statusId;
    entity.submissionDate = input.submissionDate ?? null;
    entity.approvalDate = input.approvalDate ?? null;
    entity.rejectionReason = input.rejectionReason ?? null;
    entity.creditStudyDate = input.creditStudyDate ?? null;
    entity.creditScore =
      input.creditScore != null ? String(input.creditScore) : null;
    entity.creditDecision = input.creditDecision ?? null;
    entity.approvedCreditLine = input.approvedCreditLine ?? null;
    entity.analystReport = input.analystReport ?? null;
    entity.riskProfile = input.riskProfile ?? null;
    entity.privacyPolicyAccepted = input.privacyPolicyAccepted ?? false;
    entity.privacyPolicyDate = input.privacyPolicyDate ?? null;
    return entity;
  }
}
