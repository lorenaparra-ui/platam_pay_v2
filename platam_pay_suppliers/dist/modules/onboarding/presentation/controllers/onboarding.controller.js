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
exports.OnboardingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_natural_person_onboarding_use_case_1 = require("../../application/use-cases/create-natural-person-onboarding.use-case");
const create_sales_rep_natural_opinion_use_case_1 = require("../../application/use-cases/create-sales-rep-natural-opinion.use-case");
const create_natural_person_onboarding_request_dto_1 = require("../dto/natural-person/create-natural-person-onboarding-request.dto");
const create_sales_rep_natural_opinion_request_dto_1 = require("../dto/sales-rep/create-sales-rep-natural-opinion-request.dto");
let OnboardingController = class OnboardingController {
    createNaturalPersonOnboardingUseCase;
    createSalesRepNaturalOpinionUseCase;
    constructor(createNaturalPersonOnboardingUseCase, createSalesRepNaturalOpinionUseCase) {
        this.createNaturalPersonOnboardingUseCase = createNaturalPersonOnboardingUseCase;
        this.createSalesRepNaturalOpinionUseCase = createSalesRepNaturalOpinionUseCase;
    }
    async createNaturalPerson(dto) {
        const command = this.toNaturalPersonCommand(dto);
        return this.createNaturalPersonOnboardingUseCase.execute(command);
    }
    async createSalesRepNaturalOpinion(dto) {
        const command = this.toSalesRepNaturalOpinionCommand(dto);
        return this.createSalesRepNaturalOpinionUseCase.execute(command);
    }
    toNaturalPersonCommand(dto) {
        return {
            context: {
                partnerId: dto.context.partnerId,
                salesRepId: dto.context.salesRepId,
                categoryId: dto.context.categoryId,
            },
            applicant: {
                firstName: dto.applicant.firstName,
                lastName: dto.applicant.lastName,
                documentType: dto.applicant.documentType,
                documentNumber: dto.applicant.documentNumber,
                email: dto.applicant.email,
                phone: dto.applicant.phone,
            },
            business: {
                businessName: dto.business.businessName,
                businessType: dto.business.businessType,
                businessCity: dto.business.businessCity,
                businessAddress: dto.business.businessAddress,
                numberOfEmployees: dto.business.numberOfEmployees,
                numberOfLocations: dto.business.numberOfLocations,
                seniority: dto.business.seniority,
                flagshipM2: dto.business.flagshipM2,
                hasRent: dto.business.hasRent,
                rentAmount: dto.business.rentAmount,
            },
            financial: {
                totalAssets: dto.financial.totalAssets,
                monthlyIncome: dto.financial.monthlyIncome,
                monthlyExpenses: dto.financial.monthlyExpenses,
                monthlyPurchases: dto.financial.monthlyPurchases,
                currentPurchases: dto.financial.currentPurchases,
                requestedLoc: dto.financial.requestedLoc,
            },
            isPartnerClient: dto.isPartnerClient,
        };
    }
    toSalesRepNaturalOpinionCommand(dto) {
        return {
            context: {
                partnerId: dto.context.partnerId,
                salesRepId: dto.context.salesRepId,
                categoryId: dto.context.categoryId,
            },
            opinion: {
                relationshipDuration: dto.opinion.relationshipDuration,
                confidenceScore: dto.opinion.confidenceScore,
                recommendedLoc: dto.opinion.recommendedLoc,
            },
        };
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.Post)('natural-person'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear onboarding persona natural' }),
    (0, swagger_1.ApiBody)({ type: create_natural_person_onboarding_request_dto_1.CreateNaturalPersonOnboardingRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Onboarding recibido' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validación fallida' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_natural_person_onboarding_request_dto_1.CreateNaturalPersonOnboardingRequestDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createNaturalPerson", null);
__decorate([
    (0, common_1.Post)('sales-rep/natural-opinion'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar opinión del rep para onboarding persona natural' }),
    (0, swagger_1.ApiBody)({ type: create_sales_rep_natural_opinion_request_dto_1.CreateSalesRepNaturalOpinionRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Opinión recibida' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validación fallida' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sales_rep_natural_opinion_request_dto_1.CreateSalesRepNaturalOpinionRequestDto]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createSalesRepNaturalOpinion", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, swagger_1.ApiTags)('onboarding'),
    (0, common_1.Controller)('onboarding'),
    __metadata("design:paramtypes", [create_natural_person_onboarding_use_case_1.CreateNaturalPersonOnboardingUseCase,
        create_sales_rep_natural_opinion_use_case_1.CreateSalesRepNaturalOpinionUseCase])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map