import { CreditApplicationBnpl } from '@transversal/domain/models/credit-application-bnpl.model';
import { CreditApplicationBnplEntity } from '../entities/credit-application-bnpl.entity';

export class CreditApplicationBnplMapper {
  static toDomain(entity: CreditApplicationBnplEntity): CreditApplicationBnpl {
    return new CreditApplicationBnpl({
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

  static toEntity(domain: CreditApplicationBnpl): CreditApplicationBnplEntity {
    const entity = new CreditApplicationBnplEntity();
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
}
