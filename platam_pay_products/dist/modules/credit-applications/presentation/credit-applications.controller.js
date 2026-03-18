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
exports.CreditApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_credit_application_request_dto_1 = require("../application/dto/create-credit-application-request.dto");
const credit_application_response_dto_1 = require("../application/dto/credit-application-response.dto");
const update_credit_application_request_dto_1 = require("../application/dto/update-credit-application-request.dto");
const create_credit_application_use_case_1 = require("../application/use-cases/create-credit-application.use-case");
const delete_credit_application_use_case_1 = require("../application/use-cases/delete-credit-application.use-case");
const get_all_credit_applications_use_case_1 = require("../application/use-cases/get-all-credit-applications.use-case");
const get_credit_application_by_external_id_use_case_1 = require("../application/use-cases/get-credit-application-by-external-id.use-case");
const update_credit_application_use_case_1 = require("../application/use-cases/update-credit-application.use-case");
function toResponseDto(domain) {
    const dto = new credit_application_response_dto_1.CreditApplicationResponseDto();
    dto.externalId = domain.externalId;
    dto.personId = domain.personId;
    dto.partnerId = domain.partnerId;
    dto.partnerCategoryId = domain.partnerCategoryId;
    dto.businessId = domain.businessId;
    dto.numberOfLocations = domain.numberOfLocations;
    dto.numberOfEmployees = domain.numberOfEmployees;
    dto.businessSeniority = domain.businessSeniority;
    dto.sectorExperience = domain.sectorExperience;
    dto.businessFlagshipM2 = domain.businessFlagshipM2;
    dto.businessHasRent = domain.businessHasRent;
    dto.businessRentAmount = domain.businessRentAmount;
    dto.monthlyIncome = domain.monthlyIncome;
    dto.monthlyExpenses = domain.monthlyExpenses;
    dto.monthlyPurchases = domain.monthlyPurchases;
    dto.currentPurchases = domain.currentPurchases;
    dto.totalAssets = domain.totalAssets;
    dto.requestedCreditLine = domain.requestedCreditLine;
    dto.isCurrentClient = domain.isCurrentClient;
    dto.statusId = domain.statusId;
    dto.submissionDate = domain.submissionDate?.toISOString() ?? null;
    dto.approvalDate = domain.approvalDate?.toISOString() ?? null;
    dto.rejectionReason = domain.rejectionReason;
    dto.creditStudyDate = domain.creditStudyDate?.toISOString() ?? null;
    dto.creditScore = domain.creditScore;
    dto.creditDecision = domain.creditDecision;
    dto.approvedCreditLine = domain.approvedCreditLine;
    dto.analystReport = domain.analystReport;
    dto.riskProfile = domain.riskProfile;
    dto.privacyPolicyAccepted = domain.privacyPolicyAccepted;
    dto.privacyPolicyDate = domain.privacyPolicyDate?.toISOString() ?? null;
    dto.createdAt = domain.createdAt.toISOString();
    dto.updatedAt = domain.updatedAt.toISOString();
    return dto;
}
let CreditApplicationsController = class CreditApplicationsController {
    createUseCase;
    getAllUseCase;
    getByExternalIdUseCase;
    updateUseCase;
    deleteUseCase;
    constructor(createUseCase, getAllUseCase, getByExternalIdUseCase, updateUseCase, deleteUseCase) {
        this.createUseCase = createUseCase;
        this.getAllUseCase = getAllUseCase;
        this.getByExternalIdUseCase = getByExternalIdUseCase;
        this.updateUseCase = updateUseCase;
        this.deleteUseCase = deleteUseCase;
    }
    async create(body) {
        const created = await this.createUseCase.run(body);
        return toResponseDto(created);
    }
    async findAll() {
        const list = await this.getAllUseCase.run();
        return list.map(toResponseDto);
    }
    async findByExternalId(externalId) {
        const item = await this.getByExternalIdUseCase.run(externalId);
        if (!item) {
            throw new common_2.NotFoundException("Solicitud de crédito no encontrada");
        }
        return toResponseDto(item);
    }
    async updateByExternalId(externalId, body) {
        const updated = await this.updateUseCase.run(externalId, body);
        if (!updated) {
            throw new common_2.NotFoundException("Solicitud de crédito no encontrada");
        }
        return toResponseDto(updated);
    }
    async deleteByExternalId(externalId) {
        const deleted = await this.deleteUseCase.run(externalId);
        if (!deleted) {
            throw new common_2.NotFoundException("Solicitud de crédito no encontrada");
        }
    }
};
exports.CreditApplicationsController = CreditApplicationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Crear solicitud de crédito" }),
    (0, swagger_1.ApiBody)({ type: create_credit_application_request_dto_1.CreateCreditApplicationRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Solicitud creada",
        type: credit_application_response_dto_1.CreditApplicationResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_credit_application_request_dto_1.CreateCreditApplicationRequestDto]),
    __metadata("design:returntype", Promise)
], CreditApplicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Listar solicitudes de crédito" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Lista de solicitudes",
        type: credit_application_response_dto_1.CreditApplicationResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreditApplicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener solicitud por externalId" }),
    (0, swagger_1.ApiParam)({
        name: "externalId",
        description: "UUID público de la solicitud",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Solicitud encontrada",
        type: credit_application_response_dto_1.CreditApplicationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Solicitud no encontrada",
    }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditApplicationsController.prototype, "findByExternalId", null);
__decorate([
    (0, common_1.Patch)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Actualizar solicitud por externalId" }),
    (0, swagger_1.ApiParam)({
        name: "externalId",
        description: "UUID público de la solicitud",
    }),
    (0, swagger_1.ApiBody)({ type: update_credit_application_request_dto_1.UpdateCreditApplicationRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Solicitud actualizada",
        type: credit_application_response_dto_1.CreditApplicationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Solicitud no encontrada",
    }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_credit_application_request_dto_1.UpdateCreditApplicationRequestDto]),
    __metadata("design:returntype", Promise)
], CreditApplicationsController.prototype, "updateByExternalId", null);
__decorate([
    (0, common_1.Delete)(":externalId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Eliminar solicitud por externalId" }),
    (0, swagger_1.ApiParam)({
        name: "externalId",
        description: "UUID público de la solicitud",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "Solicitud eliminada",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Solicitud no encontrada",
    }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditApplicationsController.prototype, "deleteByExternalId", null);
exports.CreditApplicationsController = CreditApplicationsController = __decorate([
    (0, swagger_1.ApiTags)("credit-applications"),
    (0, common_1.Controller)("credit-applications"),
    __metadata("design:paramtypes", [create_credit_application_use_case_1.CreateCreditApplicationUseCase,
        get_all_credit_applications_use_case_1.GetAllCreditApplicationsUseCase,
        get_credit_application_by_external_id_use_case_1.GetCreditApplicationByExternalIdUseCase,
        update_credit_application_use_case_1.UpdateCreditApplicationUseCase,
        delete_credit_application_use_case_1.DeleteCreditApplicationUseCase])
], CreditApplicationsController);
//# sourceMappingURL=credit-applications.controller.js.map