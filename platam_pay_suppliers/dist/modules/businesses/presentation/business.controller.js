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
exports.BusinessController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_business_use_case_1 = require("../application/use-cases/create-business.use-case");
const get_business_by_external_id_use_case_1 = require("../application/use-cases/get-business-by-external-id.use-case");
const list_businesses_use_case_1 = require("../application/use-cases/list-businesses.use-case");
const update_business_use_case_1 = require("../application/use-cases/update-business.use-case");
const delete_business_use_case_1 = require("../application/use-cases/delete-business.use-case");
const create_business_request_dto_1 = require("../application/dto/create-business-request.dto");
const update_business_request_dto_1 = require("../application/dto/update-business-request.dto");
const business_response_dto_1 = require("../application/dto/business-response.dto");
let BusinessController = class BusinessController {
    createBusinessUseCase;
    getBusinessByExternalIdUseCase;
    listBusinessesUseCase;
    updateBusinessUseCase;
    deleteBusinessUseCase;
    constructor(createBusinessUseCase, getBusinessByExternalIdUseCase, listBusinessesUseCase, updateBusinessUseCase, deleteBusinessUseCase) {
        this.createBusinessUseCase = createBusinessUseCase;
        this.getBusinessByExternalIdUseCase = getBusinessByExternalIdUseCase;
        this.listBusinessesUseCase = listBusinessesUseCase;
        this.updateBusinessUseCase = updateBusinessUseCase;
        this.deleteBusinessUseCase = deleteBusinessUseCase;
    }
    async create(body) {
        return this.createBusinessUseCase.execute(body);
    }
    async findAll() {
        return this.listBusinessesUseCase.execute();
    }
    async findByExternalId(externalId) {
        const result = await this.getBusinessByExternalIdUseCase.execute(externalId);
        if (!result) {
            throw new common_1.NotFoundException('Negocio no encontrado');
        }
        return result;
    }
    async updateByExternalId(externalId, body) {
        const result = await this.updateBusinessUseCase.execute(externalId, body);
        if (!result) {
            throw new common_1.NotFoundException('Negocio no encontrado');
        }
        return result;
    }
    async deleteByExternalId(externalId) {
        const deleted = await this.deleteBusinessUseCase.execute(externalId);
        if (!deleted) {
            throw new common_1.NotFoundException('Negocio no encontrado');
        }
    }
};
exports.BusinessController = BusinessController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear negocio' }),
    (0, swagger_1.ApiBody)({ type: create_business_request_dto_1.CreateBusinessRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Negocio creado',
        type: business_response_dto_1.BusinessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Body inválido' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_business_request_dto_1.CreateBusinessRequestDto]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar negocios' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de negocios',
        type: business_response_dto_1.BusinessResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':externalId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener negocio por externalId' }),
    (0, swagger_1.ApiParam)({ name: 'externalId', description: 'UUID del negocio' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Negocio encontrado',
        type: business_response_dto_1.BusinessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Formato UUID inválido' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Negocio no encontrado' }),
    __param(0, (0, common_1.Param)('externalId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "findByExternalId", null);
__decorate([
    (0, common_1.Patch)(':externalId'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar negocio por externalId' }),
    (0, swagger_1.ApiParam)({ name: 'externalId', description: 'UUID del negocio' }),
    (0, swagger_1.ApiBody)({ type: update_business_request_dto_1.UpdateBusinessRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Negocio actualizado',
        type: business_response_dto_1.BusinessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Formato UUID o body inválido' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Negocio no encontrado' }),
    __param(0, (0, common_1.Param)('externalId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_business_request_dto_1.UpdateBusinessRequestDto]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "updateByExternalId", null);
__decorate([
    (0, common_1.Delete)(':externalId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar negocio por externalId' }),
    (0, swagger_1.ApiParam)({ name: 'externalId', description: 'UUID del negocio' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Negocio eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Formato UUID inválido' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Negocio no encontrado' }),
    __param(0, (0, common_1.Param)('externalId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusinessController.prototype, "deleteByExternalId", null);
exports.BusinessController = BusinessController = __decorate([
    (0, swagger_1.ApiTags)('businesses'),
    (0, common_1.Controller)('businesses'),
    __metadata("design:paramtypes", [create_business_use_case_1.CreateBusinessUseCase,
        get_business_by_external_id_use_case_1.GetBusinessByExternalIdUseCase,
        list_businesses_use_case_1.ListBusinessesUseCase,
        update_business_use_case_1.UpdateBusinessUseCase,
        delete_business_use_case_1.DeleteBusinessUseCase])
], BusinessController);
//# sourceMappingURL=business.controller.js.map