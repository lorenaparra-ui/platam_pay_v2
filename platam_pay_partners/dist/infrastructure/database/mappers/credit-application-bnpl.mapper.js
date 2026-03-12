"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditApplicationBnplMapper = void 0;
const credit_application_bnpl_model_1 = require("../../../modules/credit-applications-bnpl/domain/models/credit-application-bnpl.model");
const credit_application_bnpl_entity_1 = require("../entities/credit-application-bnpl.entity");
class CreditApplicationBnplMapper {
    static toDomain(entity) {
        return new credit_application_bnpl_model_1.CreditApplicationBnpl({
            id: entity.id,
            externalId: entity.externalId,
            userId: entity.userId,
            userProductId: entity.userProductId,
            partnerId: entity.partnerId,
            partnerCategoryId: entity.partnerCategoryId,
            salesRepId: entity.salesRepId,
            businessId: entity.businessId,
            numberOfLocations: entity.numberOfLocations,
            numberOfEmployees: entity.numberOfEmployees,
            businessSeniorityId: entity.businessSeniorityId,
            sectorExperience: entity.sectorExperience,
            businessFlagshipM2: entity.businessFlagshipM2,
            businessHasRent: entity.businessHasRent,
            businessRentAmount: entity.businessRentAmount,
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
    static toCreateEntity(payload) {
        const entity = new credit_application_bnpl_entity_1.CreditApplicationBnplEntity();
        return this.applyPayload(entity, payload);
    }
    static applyUpdate(entity, payload) {
        return this.applyPayload(entity, payload);
    }
    static applyPayload(entity, payload) {
        if (payload.userId !== undefined)
            entity.userId = payload.userId;
        if (payload.userProductId !== undefined)
            entity.userProductId = payload.userProductId;
        if (payload.partnerId !== undefined)
            entity.partnerId = payload.partnerId;
        if (payload.partnerCategoryId !== undefined)
            entity.partnerCategoryId = payload.partnerCategoryId;
        if (payload.salesRepId !== undefined)
            entity.salesRepId = payload.salesRepId;
        if (payload.businessId !== undefined)
            entity.businessId = payload.businessId;
        if (payload.numberOfLocations !== undefined)
            entity.numberOfLocations = payload.numberOfLocations;
        if (payload.numberOfEmployees !== undefined)
            entity.numberOfEmployees = payload.numberOfEmployees;
        if (payload.businessSeniorityId !== undefined)
            entity.businessSeniorityId = payload.businessSeniorityId;
        if (payload.sectorExperience !== undefined)
            entity.sectorExperience = payload.sectorExperience;
        if (payload.businessFlagshipM2 !== undefined)
            entity.businessFlagshipM2 = payload.businessFlagshipM2;
        if (payload.businessHasRent !== undefined)
            entity.businessHasRent = payload.businessHasRent;
        if (payload.businessRentAmount !== undefined)
            entity.businessRentAmount = payload.businessRentAmount;
        if (payload.monthlyIncome !== undefined)
            entity.monthlyIncome = payload.monthlyIncome;
        if (payload.monthlyExpenses !== undefined)
            entity.monthlyExpenses = payload.monthlyExpenses;
        if (payload.monthlyPurchases !== undefined)
            entity.monthlyPurchases = payload.monthlyPurchases;
        if (payload.currentPurchases !== undefined)
            entity.currentPurchases = payload.currentPurchases;
        if (payload.totalAssets !== undefined)
            entity.totalAssets = payload.totalAssets;
        if (payload.requestedCreditLine !== undefined)
            entity.requestedCreditLine = payload.requestedCreditLine;
        if (payload.isCurrentClient !== undefined)
            entity.isCurrentClient = payload.isCurrentClient;
        if (payload.statusId !== undefined)
            entity.statusId = payload.statusId;
        if (payload.submissionDate !== undefined)
            entity.submissionDate = payload.submissionDate;
        if (payload.approvalDate !== undefined)
            entity.approvalDate = payload.approvalDate;
        if (payload.rejectionReason !== undefined)
            entity.rejectionReason = payload.rejectionReason;
        if (payload.creditStudyDate !== undefined)
            entity.creditStudyDate = payload.creditStudyDate;
        if (payload.creditScore !== undefined)
            entity.creditScore = payload.creditScore;
        if (payload.creditDecision !== undefined)
            entity.creditDecision = payload.creditDecision;
        if (payload.approvedCreditLine !== undefined)
            entity.approvedCreditLine = payload.approvedCreditLine;
        if (payload.analystReport !== undefined)
            entity.analystReport = payload.analystReport;
        if (payload.riskProfile !== undefined)
            entity.riskProfile = payload.riskProfile;
        if (payload.privacyPolicyAccepted !== undefined)
            entity.privacyPolicyAccepted = payload.privacyPolicyAccepted;
        if (payload.privacyPolicyDate !== undefined)
            entity.privacyPolicyDate = payload.privacyPolicyDate;
        return entity;
    }
}
exports.CreditApplicationBnplMapper = CreditApplicationBnplMapper;
//# sourceMappingURL=credit-application-bnpl.mapper.js.map