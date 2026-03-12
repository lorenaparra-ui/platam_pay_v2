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
exports.CreditApplicationBnplController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_credit_application_bnpl_use_case_1 = require("../application/use-cases/create-credit-application-bnpl.use-case");
const get_credit_application_bnpl_by_external_id_use_case_1 = require("../application/use-cases/get-credit-application-bnpl-by-external-id.use-case");
const list_credit_applications_bnpl_use_case_1 = require("../application/use-cases/list-credit-applications-bnpl.use-case");
const update_credit_application_bnpl_use_case_1 = require("../application/use-cases/update-credit-application-bnpl.use-case");
const delete_credit_application_bnpl_use_case_1 = require("../application/use-cases/delete-credit-application-bnpl.use-case");
const create_credit_application_bnpl_request_dto_1 = require("../application/dto/create-credit-application-bnpl-request.dto");
const update_credit_application_bnpl_request_dto_1 = require("../application/dto/update-credit-application-bnpl-request.dto");
const credit_application_bnpl_response_dto_1 = require("../application/dto/credit-application-bnpl-response.dto");
let CreditApplicationBnplController = class CreditApplicationBnplController {
    createUseCase;
    getByExternalIdUseCase;
    listUseCase;
    updateUseCase;
    deleteUseCase;
    constructor(createUseCase, getByExternalIdUseCase, listUseCase, updateUseCase, deleteUseCase) {
        this.createUseCase = createUseCase;
        this.getByExternalIdUseCase = getByExternalIdUseCase;
        this.listUseCase = listUseCase;
        this.updateUseCase = updateUseCase;
        this.deleteUseCase = deleteUseCase;
    }
    async create(body) {
        return this.createUseCase.execute(body);
    }
    async findAll() {
        return this.listUseCase.execute();
    }
    async findByExternalId(externalId) {
        const result = await this.getByExternalIdUseCase.execute(externalId);
        if (!result) {
            throw new common_1.NotFoundException("Solicitud de crédito BNPL no encontrada");
        }
        return result;
    }
    async updateByExternalId(externalId, body) {
        const result = await this.updateUseCase.execute(externalId, body);
        if (!result) {
            throw new common_1.NotFoundException("Solicitud de crédito BNPL no encontrada");
        }
        return result;
    }
    async deleteByExternalId(externalId) {
        const deleted = await this.deleteUseCase.execute(externalId);
        if (!deleted) {
            throw new common_1.NotFoundException("Solicitud de crédito BNPL no encontrada");
        }
    }
};
exports.CreditApplicationBnplController = CreditApplicationBnplController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Crear solicitud de crédito BNPL" }),
    (0, swagger_1.ApiBody)({ type: create_credit_application_bnpl_request_dto_1.CreateCreditApplicationBnplRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Solicitud creada",
        type: credit_application_bnpl_response_dto_1.CreditApplicationBnplResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Body inválido" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_credit_application_bnpl_request_dto_1.CreateCreditApplicationBnplRequestDto]),
    __metadata("design:returntype", Promise)
], CreditApplicationBnplController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Listar solicitudes de crédito BNPL" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista de solicitudes",
        type: credit_application_bnpl_response_dto_1.CreditApplicationBnplResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreditApplicationBnplController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener solicitud por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID de la solicitud" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Solicitud encontrada",
        type: credit_application_bnpl_response_dto_1.CreditApplicationBnplResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Formato UUID inválido" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Solicitud no encontrada" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditApplicationBnplController.prototype, "findByExternalId", null);
__decorate([
    (0, common_1.Patch)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Actualizar solicitud por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID de la solicitud" }),
    (0, swagger_1.ApiBody)({ type: update_credit_application_bnpl_request_dto_1.UpdateCreditApplicationBnplRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Solicitud actualizada",
        type: credit_application_bnpl_response_dto_1.CreditApplicationBnplResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Formato UUID o body inválido" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Solicitud no encontrada" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_credit_application_bnpl_request_dto_1.UpdateCreditApplicationBnplRequestDto]),
    __metadata("design:returntype", Promise)
], CreditApplicationBnplController.prototype, "updateByExternalId", null);
__decorate([
    (0, common_1.Delete)(":externalId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Eliminar solicitud por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID de la solicitud" }),
    (0, swagger_1.ApiResponse)({ status: 204, description: "Solicitud eliminada" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Formato UUID inválido" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Solicitud no encontrada" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreditApplicationBnplController.prototype, "deleteByExternalId", null);
exports.CreditApplicationBnplController = CreditApplicationBnplController = __decorate([
    (0, swagger_1.ApiTags)("credit-applications-bnpl"),
    (0, common_1.Controller)("credit-applications-bnpl"),
    __metadata("design:paramtypes", [create_credit_application_bnpl_use_case_1.CreateCreditApplicationBnplUseCase,
        get_credit_application_bnpl_by_external_id_use_case_1.GetCreditApplicationBnplByExternalIdUseCase,
        list_credit_applications_bnpl_use_case_1.ListCreditApplicationsBnplUseCase,
        update_credit_application_bnpl_use_case_1.UpdateCreditApplicationBnplUseCase,
        delete_credit_application_bnpl_use_case_1.DeleteCreditApplicationBnplUseCase])
], CreditApplicationBnplController);
//# sourceMappingURL=credit-application-bnpl.controller.js.map