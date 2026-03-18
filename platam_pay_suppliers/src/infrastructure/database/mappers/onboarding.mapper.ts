import { Onboarding } from '@onboarding/domain/models/onboarding.model';
import {
  CreateOnboardingPayload,
  UpdateOnboardingPayload,
} from '@onboarding/domain/ports/onboarding.repository.port';
import { OnboardingEntity } from '@libs/database';

export class OnboardingMapper {
  static toDomain(entity: OnboardingEntity): Onboarding {
    return new Onboarding({
      id: entity.id,
      externalId: entity.externalId,
      userId: entity.userId,
      userProductId: entity.userProductId,
      partnerId: entity.partnerId,
      partnerCategoryId: entity.partnerCategoryId,
      salesRepId: entity.salesRepId,
      businessName: entity.businessName,
      businessRelationId: entity.businessRelationId,
      businessTypeName: entity.businessTypeName,
      businessTypeCode: entity.businessTypeCode,
      businessAddress: entity.businessAddress,
      businessCity: entity.businessCity,
      businessRentAmount: entity.businessRentAmount,
      numberOfLocations: entity.numberOfLocations,
      numberOfEmployees: entity.numberOfEmployees,
      businessSeniorityId: entity.businessSeniorityId,
      sectorExperience: entity.sectorExperience,
      relationshipToBusiness: entity.relationshipToBusiness,
      monthlyIncome: entity.monthlyIncome,
      monthlyExpenses: entity.monthlyExpenses,
      monthlyPurchases: entity.monthlyPurchases,
      currentPurchases: entity.currentPurchases,
      totalAssets: entity.totalAssets,
      requestedCreditLine: entity.requestedCreditLine,
      isCurrentClient: entity.isCurrentClient,
      statusId: entity.statusId,
      submissionDate: entity.submissionDate,
      approvalDate: entity.approvalDate,
      rejectionReason: entity.rejectionReason,
      creditStudyDate: entity.creditStudyDate,
      creditScore: entity.creditScore,
      creditDecision: entity.creditDecision,
      approvedCreditLine: entity.approvedCreditLine,
      analystReport: entity.analystReport,
      riskProfile: entity.riskProfile,
      privacyPolicyAccepted: entity.privacyPolicyAccepted,
      privacyPolicyDate: entity.privacyPolicyDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(domain: Onboarding): OnboardingEntity {
    const entity = new OnboardingEntity();
    entity.id = domain.id;
    entity.userId = domain.userId;
    entity.userProductId = domain.userProductId;
    entity.partnerId = domain.partnerId;
    entity.partnerCategoryId = domain.partnerCategoryId;
    entity.salesRepId = domain.salesRepId;
    entity.businessName = domain.businessName;
    entity.businessRelationId = domain.businessRelationId;
    entity.businessTypeName = domain.businessTypeName;
    entity.businessTypeCode = domain.businessTypeCode;
    entity.businessAddress = domain.businessAddress;
    entity.businessCity = domain.businessCity;
    entity.businessRentAmount = domain.businessRentAmount;
    entity.numberOfLocations = domain.numberOfLocations;
    entity.numberOfEmployees = domain.numberOfEmployees;
    entity.businessSeniorityId = domain.businessSeniorityId;
    entity.sectorExperience = domain.sectorExperience;
    entity.relationshipToBusiness = domain.relationshipToBusiness;
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
    entity.creditScore = domain.creditScore;
    entity.creditDecision = domain.creditDecision;
    entity.approvedCreditLine = domain.approvedCreditLine;
    entity.analystReport = domain.analystReport;
    entity.riskProfile = domain.riskProfile;
    entity.privacyPolicyAccepted = domain.privacyPolicyAccepted;
    entity.privacyPolicyDate = domain.privacyPolicyDate;
    return entity;
  }

  static toCreateEntity(payload: CreateOnboardingPayload): OnboardingEntity {
    const entity = new OnboardingEntity();
    return this.applyMutableFields(entity, payload);
  }

  static applyUpdate(
    entity: OnboardingEntity,
    payload: UpdateOnboardingPayload,
  ): OnboardingEntity {
    return this.applyMutableFields(entity, payload);
  }

  private static applyMutableFields(
    entity: OnboardingEntity,
    payload: UpdateOnboardingPayload,
  ): OnboardingEntity {
    if (payload.userId !== undefined) entity.userId = payload.userId;
    if (payload.userProductId !== undefined)
      entity.userProductId = payload.userProductId;
    if (payload.partnerId !== undefined) entity.partnerId = payload.partnerId;
    if (payload.partnerCategoryId !== undefined)
      entity.partnerCategoryId = payload.partnerCategoryId;
    if (payload.salesRepId !== undefined) entity.salesRepId = payload.salesRepId;
    if (payload.businessName !== undefined)
      entity.businessName = payload.businessName;
    if (payload.businessRelationId !== undefined)
      entity.businessRelationId = payload.businessRelationId;
    if (payload.businessTypeName !== undefined)
      entity.businessTypeName = payload.businessTypeName;
    if (payload.businessTypeCode !== undefined)
      entity.businessTypeCode = payload.businessTypeCode;
    if (payload.businessAddress !== undefined)
      entity.businessAddress = payload.businessAddress;
    if (payload.businessCity !== undefined)
      entity.businessCity = payload.businessCity;
    if (payload.businessRentAmount !== undefined)
      entity.businessRentAmount = payload.businessRentAmount;
    if (payload.numberOfLocations !== undefined)
      entity.numberOfLocations = payload.numberOfLocations;
    if (payload.numberOfEmployees !== undefined)
      entity.numberOfEmployees = payload.numberOfEmployees;
    if (payload.businessSeniorityId !== undefined)
      entity.businessSeniorityId = payload.businessSeniorityId;
    if (payload.sectorExperience !== undefined)
      entity.sectorExperience = payload.sectorExperience;
    if (payload.relationshipToBusiness !== undefined)
      entity.relationshipToBusiness = payload.relationshipToBusiness;
    if (payload.monthlyIncome !== undefined)
      entity.monthlyIncome = payload.monthlyIncome;
    if (payload.monthlyExpenses !== undefined)
      entity.monthlyExpenses = payload.monthlyExpenses;
    if (payload.monthlyPurchases !== undefined)
      entity.monthlyPurchases = payload.monthlyPurchases;
    if (payload.currentPurchases !== undefined)
      entity.currentPurchases = payload.currentPurchases;
    if (payload.totalAssets !== undefined) entity.totalAssets = payload.totalAssets;
    if (payload.requestedCreditLine !== undefined)
      entity.requestedCreditLine = payload.requestedCreditLine;
    if (payload.isCurrentClient !== undefined)
      entity.isCurrentClient = payload.isCurrentClient;
    if (payload.statusId !== undefined) entity.statusId = payload.statusId;
    if (payload.submissionDate !== undefined)
      entity.submissionDate = payload.submissionDate;
    if (payload.approvalDate !== undefined)
      entity.approvalDate = payload.approvalDate;
    if (payload.rejectionReason !== undefined)
      entity.rejectionReason = payload.rejectionReason;
    if (payload.creditStudyDate !== undefined)
      entity.creditStudyDate = payload.creditStudyDate;
    if (payload.creditScore !== undefined) entity.creditScore = payload.creditScore;
    if (payload.creditDecision !== undefined)
      entity.creditDecision = payload.creditDecision;
    if (payload.approvedCreditLine !== undefined)
      entity.approvedCreditLine = payload.approvedCreditLine;
    if (payload.analystReport !== undefined)
      entity.analystReport = payload.analystReport;
    if (payload.riskProfile !== undefined) entity.riskProfile = payload.riskProfile;
    if (payload.privacyPolicyAccepted !== undefined)
      entity.privacyPolicyAccepted = payload.privacyPolicyAccepted;
    if (payload.privacyPolicyDate !== undefined)
      entity.privacyPolicyDate = payload.privacyPolicyDate;
    return entity;
  }
}
