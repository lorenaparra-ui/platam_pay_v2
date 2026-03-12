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
exports.PartnerCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const create_partner_category_request_dto_1 = require("../application/dto/create-partner-category-request.dto");
const partner_category_list_query_dto_1 = require("../application/dto/partner-category-list-query.dto");
const find_categories_by_partner_use_case_1 = require("../application/use-cases/find-categories-by-partner.use-case");
const create_partner_category_use_case_1 = require("../application/use-cases/create-partner-category.use-case");
const find_all_partner_categories_use_case_1 = require("../application/use-cases/find-all-partner-categories.use-case");
const find_partner_category_by_external_id_use_case_1 = require("../application/use-cases/find-partner-category-by-external-id.use-case");
const update_partner_category_by_external_id_use_case_1 = require("../application/use-cases/update-partner-category-by-external-id.use-case");
const delete_partner_category_by_external_id_use_case_1 = require("../application/use-cases/delete-partner-category-by-external-id.use-case");
const update_partner_category_request_dto_1 = require("../application/dto/update-partner-category-request.dto");
const partner_category_response_dto_1 = require("../application/dto/partner-category-response.dto");
function toResponseDto(domain) {
    const dto = new partner_category_response_dto_1.PartnerCategoryResponseDto();
    dto.externalId = domain.externalId;
    dto.partnerId = domain.partnerId;
    dto.name = domain.name;
    dto.discountPercentage = domain.discountPercentage;
    dto.interestRate = domain.interestRate;
    dto.disbursementFeePercent = domain.disbursementFeePercent;
    dto.minimumDisbursementFee = domain.minimumDisbursementFee;
    dto.delayDays = domain.delayDays;
    dto.termDays = domain.termDays;
    dto.statusId = domain.statusId;
    dto.createdAt = domain.createdAt.toISOString();
    dto.updatedAt = domain.updatedAt.toISOString();
    return dto;
}
let PartnerCategoriesController = class PartnerCategoriesController {
    createPartnerCategoryUseCase;
    findAllPartnerCategoriesUseCase;
    findPartnerCategoryByExternalIdUseCase;
    updatePartnerCategoryByExternalIdUseCase;
    deletePartnerCategoryByExternalIdUseCase;
    findCategoriesByPartnerUseCase;
    constructor(createPartnerCategoryUseCase, findAllPartnerCategoriesUseCase, findPartnerCategoryByExternalIdUseCase, updatePartnerCategoryByExternalIdUseCase, deletePartnerCategoryByExternalIdUseCase, findCategoriesByPartnerUseCase) {
        this.createPartnerCategoryUseCase = createPartnerCategoryUseCase;
        this.findAllPartnerCategoriesUseCase = findAllPartnerCategoriesUseCase;
        this.findPartnerCategoryByExternalIdUseCase = findPartnerCategoryByExternalIdUseCase;
        this.updatePartnerCategoryByExternalIdUseCase = updatePartnerCategoryByExternalIdUseCase;
        this.deletePartnerCategoryByExternalIdUseCase = deletePartnerCategoryByExternalIdUseCase;
        this.findCategoriesByPartnerUseCase = findCategoriesByPartnerUseCase;
    }
    async create(body) {
        const created = await this.executeWithConstraintHandling(() => this.createPartnerCategoryUseCase.execute({
            partnerExternalId: body.partnerExternalId,
            name: body.name,
            discountPercentage: body.discountPercentage,
            interestRate: body.interestRate,
            disbursementFeePercent: body.disbursementFeePercent ?? null,
            minimumDisbursementFee: body.minimumDisbursementFee ?? null,
            delayDays: body.delayDays,
            termDays: body.termDays,
            statusId: body.statusId,
        }));
        if (!created) {
            throw new common_1.NotFoundException("Partner not found");
        }
        return toResponseDto(created);
    }
    async findAll(query) {
        const categories = await this.findAllPartnerCategoriesUseCase.execute(query.partnerExternalId);
        return categories.map(toResponseDto);
    }
    async findByExternalId(externalId) {
        const category = await this.findPartnerCategoryByExternalIdUseCase.execute(externalId);
        if (!category) {
            throw new common_1.NotFoundException("Partner category not found");
        }
        return toResponseDto(category);
    }
    async updateByExternalId(externalId, body) {
        const updated = await this.executeWithConstraintHandling(() => this.updatePartnerCategoryByExternalIdUseCase.execute(externalId, {
            name: body.name,
            discountPercentage: body.discountPercentage,
            interestRate: body.interestRate,
            disbursementFeePercent: body.disbursementFeePercent,
            minimumDisbursementFee: body.minimumDisbursementFee,
            delayDays: body.delayDays,
            termDays: body.termDays,
            statusId: body.statusId,
        }));
        if (!updated) {
            throw new common_1.NotFoundException("Partner category not found");
        }
        return toResponseDto(updated);
    }
    async deleteByExternalId(externalId) {
        const deleted = await this.deletePartnerCategoryByExternalIdUseCase.execute(externalId);
        if (!deleted) {
            throw new common_1.NotFoundException("Partner category not found");
        }
    }
    async findByPartner(partnerExternalId) {
        const categories = await this.findCategoriesByPartnerUseCase.execute(partnerExternalId);
        return categories.map(toResponseDto);
    }
    async executeWithConstraintHandling(action) {
        try {
            return await action();
        }
        catch (error) {
            const driverErrorCode = error
                .driverError?.code;
            if (error instanceof typeorm_1.QueryFailedError &&
                typeof driverErrorCode === "string" &&
                driverErrorCode === "23505") {
                throw new common_1.ConflictException("Duplicated unique value");
            }
            if (error instanceof typeorm_1.QueryFailedError &&
                typeof driverErrorCode === "string" &&
                driverErrorCode === "23502") {
                throw new common_1.BadRequestException("Missing required value");
            }
            if (error instanceof typeorm_1.QueryFailedError &&
                typeof driverErrorCode === "string" &&
                driverErrorCode === "23503") {
                throw new common_1.BadRequestException("Invalid foreign key reference");
            }
            throw error;
        }
    }
};
exports.PartnerCategoriesController = PartnerCategoriesController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "Crear categoria de partner" }),
    (0, swagger_1.ApiBody)({ type: create_partner_category_request_dto_1.CreatePartnerCategoryRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Categoria creada",
        type: partner_category_response_dto_1.PartnerCategoryResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partner_category_request_dto_1.CreatePartnerCategoryRequestDto]),
    __metadata("design:returntype", Promise)
], PartnerCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("register"),
    (0, swagger_1.ApiOperation)({ summary: "Listar categorias de partner" }),
    (0, swagger_1.ApiQuery)({
        name: "partnerExternalId",
        required: false,
        description: "Filtra por UUID publico del partner",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista de categorias",
        type: partner_category_response_dto_1.PartnerCategoryResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [partner_category_list_query_dto_1.PartnerCategoryListQueryDto]),
    __metadata("design:returntype", Promise)
], PartnerCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("register/:externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener categoria por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID publico de la categoria" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Categoria encontrada",
        type: partner_category_response_dto_1.PartnerCategoryResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Categoria no encontrada" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnerCategoriesController.prototype, "findByExternalId", null);
__decorate([
    (0, common_1.Patch)("register/:externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Actualizar categoria por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID publico de la categoria" }),
    (0, swagger_1.ApiBody)({ type: update_partner_category_request_dto_1.UpdatePartnerCategoryRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Categoria actualizada",
        type: partner_category_response_dto_1.PartnerCategoryResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Categoria no encontrada" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_partner_category_request_dto_1.UpdatePartnerCategoryRequestDto]),
    __metadata("design:returntype", Promise)
], PartnerCategoriesController.prototype, "updateByExternalId", null);
__decorate([
    (0, common_1.Delete)("register/:externalId"),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: "Eliminar categoria por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID publico de la categoria" }),
    (0, swagger_1.ApiResponse)({ status: 204, description: "Categoria eliminada" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Categoria no encontrada" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnerCategoriesController.prototype, "deleteByExternalId", null);
__decorate([
    (0, common_1.Get)("partner/:partnerExternalId"),
    (0, swagger_1.ApiOperation)({ summary: "Listar categorias de un partner" }),
    (0, swagger_1.ApiParam)({
        name: "partnerExternalId",
        description: "UUID publico del partner",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Categorias del partner",
        type: partner_category_response_dto_1.PartnerCategoryResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Param)("partnerExternalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnerCategoriesController.prototype, "findByPartner", null);
exports.PartnerCategoriesController = PartnerCategoriesController = __decorate([
    (0, swagger_1.ApiTags)("partner-categories"),
    (0, common_1.Controller)("partner-categories"),
    __metadata("design:paramtypes", [create_partner_category_use_case_1.CreatePartnerCategoryUseCase,
        find_all_partner_categories_use_case_1.FindAllPartnerCategoriesUseCase,
        find_partner_category_by_external_id_use_case_1.FindPartnerCategoryByExternalIdUseCase,
        update_partner_category_by_external_id_use_case_1.UpdatePartnerCategoryByExternalIdUseCase,
        delete_partner_category_by_external_id_use_case_1.DeletePartnerCategoryByExternalIdUseCase,
        find_categories_by_partner_use_case_1.FindCategoriesByPartnerUseCase])
], PartnerCategoriesController);
//# sourceMappingURL=partner-categories.controller.js.map