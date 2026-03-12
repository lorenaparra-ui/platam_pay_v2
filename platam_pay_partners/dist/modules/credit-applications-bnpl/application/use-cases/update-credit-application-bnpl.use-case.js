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
exports.UpdateCreditApplicationBnplUseCase = void 0;
const common_1 = require("@nestjs/common");
const credit_application_bnpl_repository_port_1 = require("../../domain/ports/credit-application-bnpl.repository.port");
const credit_application_bnpl_response_dto_1 = require("../dto/credit-application-bnpl-response.dto");
function toDateOrNull(v) {
    if (v == null || v === "")
        return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
}
let UpdateCreditApplicationBnplUseCase = class UpdateCreditApplicationBnplUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(externalId, dto) {
        const payload = {};
        if (dto.userId !== undefined)
            payload.userId = dto.userId;
        if (dto.userProductId !== undefined)
            payload.userProductId = dto.userProductId;
        if (dto.partnerId !== undefined)
            payload.partnerId = dto.partnerId;
        if (dto.partnerCategoryId !== undefined)
            payload.partnerCategoryId = dto.partnerCategoryId;
        if (dto.salesRepId !== undefined)
            payload.salesRepId = dto.salesRepId;
        if (dto.businessId !== undefined)
            payload.businessId = dto.businessId;
        if (dto.numberOfLocations !== undefined)
            payload.numberOfLocations = dto.numberOfLocations;
        if (dto.numberOfEmployees !== undefined)
            payload.numberOfEmployees = dto.numberOfEmployees;
        if (dto.businessSeniorityId !== undefined)
            payload.businessSeniorityId = dto.businessSeniorityId;
        if (dto.sectorExperience !== undefined)
            payload.sectorExperience = dto.sectorExperience;
        if (dto.businessFlagshipM2 !== undefined)
            payload.businessFlagshipM2 = dto.businessFlagshipM2;
        if (dto.businessHasRent !== undefined)
            payload.businessHasRent = dto.businessHasRent;
        if (dto.businessRentAmount !== undefined)
            payload.businessRentAmount = dto.businessRentAmount;
        if (dto.monthlyIncome !== undefined)
            payload.monthlyIncome = dto.monthlyIncome;
        if (dto.monthlyExpenses !== undefined)
            payload.monthlyExpenses = dto.monthlyExpenses;
        if (dto.monthlyPurchases !== undefined)
            payload.monthlyPurchases = dto.monthlyPurchases;
        if (dto.currentPurchases !== undefined)
            payload.currentPurchases = dto.currentPurchases;
        if (dto.totalAssets !== undefined)
            payload.totalAssets = dto.totalAssets;
        if (dto.requestedCreditLine !== undefined)
            payload.requestedCreditLine = dto.requestedCreditLine;
        if (dto.isCurrentClient !== undefined)
            payload.isCurrentClient = dto.isCurrentClient;
        if (dto.statusId !== undefined)
            payload.statusId = dto.statusId;
        if (dto.submissionDate !== undefined)
            payload.submissionDate = toDateOrNull(dto.submissionDate);
        if (dto.approvalDate !== undefined)
            payload.approvalDate = toDateOrNull(dto.approvalDate);
        if (dto.rejectionReason !== undefined)
            payload.rejectionReason = dto.rejectionReason;
        if (dto.creditStudyDate !== undefined)
            payload.creditStudyDate = toDateOrNull(dto.creditStudyDate);
        if (dto.creditScore !== undefined)
            payload.creditScore = dto.creditScore;
        if (dto.creditDecision !== undefined)
            payload.creditDecision = dto.creditDecision;
        if (dto.approvedCreditLine !== undefined)
            payload.approvedCreditLine = dto.approvedCreditLine;
        if (dto.analystReport !== undefined)
            payload.analystReport = dto.analystReport;
        if (dto.riskProfile !== undefined)
            payload.riskProfile = dto.riskProfile;
        if (dto.privacyPolicyAccepted !== undefined)
            payload.privacyPolicyAccepted = dto.privacyPolicyAccepted;
        if (dto.privacyPolicyDate !== undefined)
            payload.privacyPolicyDate = toDateOrNull(dto.privacyPolicyDate);
        const entity = await this.repository.updateByExternalId(externalId, payload);
        return entity ? credit_application_bnpl_response_dto_1.CreditApplicationBnplResponseDto.fromDomain(entity) : null;
    }
};
exports.UpdateCreditApplicationBnplUseCase = UpdateCreditApplicationBnplUseCase;
exports.UpdateCreditApplicationBnplUseCase = UpdateCreditApplicationBnplUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_application_bnpl_repository_port_1.CREDIT_APPLICATION_BNPL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateCreditApplicationBnplUseCase);
//# sourceMappingURL=update-credit-application-bnpl.use-case.js.map