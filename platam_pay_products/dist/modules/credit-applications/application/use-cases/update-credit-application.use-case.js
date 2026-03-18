"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCreditApplicationUseCase = void 0;
const common_1 = require("@nestjs/common");
const credit_application_repository_port_1 = require("../../domain/ports/credit-application.repository.port");
let UpdateCreditApplicationUseCase = class UpdateCreditApplicationUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async run(externalId, dto) {
        const input = {};
        if (dto.personId !== undefined)
            input.personId = dto.personId;
        if (dto.partnerId !== undefined)
            input.partnerId = dto.partnerId;
        if (dto.partnerCategoryId !== undefined)
            input.partnerCategoryId = dto.partnerCategoryId;
        if (dto.businessId !== undefined)
            input.businessId = dto.businessId;
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
        if (dto.totalAssets !== undefined)
            input.totalAssets = dto.totalAssets;
        if (dto.requestedCreditLine !== undefined)
            input.requestedCreditLine = dto.requestedCreditLine;
        if (dto.isCurrentClient !== undefined)
            input.isCurrentClient = dto.isCurrentClient;
        if (dto.statusId != null)
            input.statusId = dto.statusId;
        if (dto.submissionDate !== undefined)
            input.submissionDate = dto.submissionDate;
        if (dto.approvalDate !== undefined)
            input.approvalDate = dto.approvalDate;
        if (dto.rejectionReason !== undefined)
            input.rejectionReason = dto.rejectionReason;
        if (dto.creditStudyDate !== undefined)
            input.creditStudyDate = dto.creditStudyDate;
        if (dto.creditScore !== undefined)
            input.creditScore = dto.creditScore;
        if (dto.creditDecision !== undefined)
            input.creditDecision = dto.creditDecision;
        if (dto.approvedCreditLine !== undefined)
            input.approvedCreditLine = dto.approvedCreditLine;
        if (dto.analystReport !== undefined)
            input.analystReport = dto.analystReport;
        if (dto.riskProfile !== undefined)
            input.riskProfile = dto.riskProfile;
        if (dto.privacyPolicyAccepted !== undefined)
            input.privacyPolicyAccepted = dto.privacyPolicyAccepted;
        if (dto.privacyPolicyDate !== undefined)
            input.privacyPolicyDate = dto.privacyPolicyDate;
        return this.repository.updateByExternalId(externalId, input);
    }
};
exports.UpdateCreditApplicationUseCase = UpdateCreditApplicationUseCase;
exports.UpdateCreditApplicationUseCase = UpdateCreditApplicationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_application_repository_port_1.CREDIT_APPLICATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateCreditApplicationUseCase);
//# sourceMappingURL=update-credit-application.use-case.js.map