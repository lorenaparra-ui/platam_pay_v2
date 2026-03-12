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
exports.CreateCreditApplicationBnplUseCase = void 0;
const common_1 = require("@nestjs/common");
const credit_application_bnpl_repository_port_1 = require("../../domain/ports/credit-application-bnpl.repository.port");
let CreateCreditApplicationBnplUseCase = class CreateCreditApplicationBnplUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async run(dto) {
        return this.repository.create({
            userId: dto.userId,
            userProductId: dto.userProductId ?? null,
            partnerId: dto.partnerId ?? null,
            partnerCategoryId: dto.partnerCategoryId ?? null,
            salesRepId: dto.salesRepId ?? null,
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
};
exports.CreateCreditApplicationBnplUseCase = CreateCreditApplicationBnplUseCase;
exports.CreateCreditApplicationBnplUseCase = CreateCreditApplicationBnplUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(credit_application_bnpl_repository_port_1.CREDIT_APPLICATION_BNPL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateCreditApplicationBnplUseCase);
//# sourceMappingURL=create-credit-application-bnpl.use-case.js.map