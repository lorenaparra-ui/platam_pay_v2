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
exports.PartnersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const change_partner_status_request_dto_1 = require("../application/dto/change-partner-status-request.dto");
const create_partner_request_dto_1 = require("../application/dto/create-partner-request.dto");
const partner_list_query_dto_1 = require("../application/dto/partner-list-query.dto");
const partner_response_dto_1 = require("../application/dto/partner-response.dto");
const update_partner_request_dto_1 = require("../application/dto/update-partner-request.dto");
const change_partner_status_use_case_1 = require("../application/use-cases/change-partner-status.use-case");
const create_partner_use_case_1 = require("../application/use-cases/create-partner.use-case");
const delete_partner_by_external_id_use_case_1 = require("../application/use-cases/delete-partner-by-external-id.use-case");
const find_all_partners_use_case_1 = require("../application/use-cases/find-all-partners.use-case");
const find_partner_by_external_id_use_case_1 = require("../application/use-cases/find-partner-by-external-id.use-case");
const update_partner_by_external_id_use_case_1 = require("../application/use-cases/update-partner-by-external-id.use-case");
function toResponseDto(domain) {
    const dto = new partner_response_dto_1.PartnerResponseDto();
    dto.externalId = domain.externalId;
    dto.businessId = domain.businessId;
    dto.acronym = domain.acronym;
    dto.logoUrl = domain.logoUrl;
    dto.coBrandingLogoUrl = domain.coBrandingLogoUrl;
    dto.primaryColor = domain.primaryColor;
    dto.secondaryColor = domain.secondaryColor;
    dto.lightColor = domain.lightColor;
    dto.salesRepRoleName = domain.salesRepRoleName;
    dto.salesRepRoleNamePlural = domain.salesRepRoleNamePlural;
    dto.notificationEmail = domain.notificationEmail;
    dto.webhookUrl = domain.webhookUrl;
    dto.sendSalesRepVoucher = domain.sendSalesRepVoucher;
    dto.disbursementNotificationEmail = domain.disbursementNotificationEmail;
    dto.defaultRepId = domain.defaultRepId;
    dto.defaultCategoryId = domain.defaultCategoryId;
    dto.statusId = domain.statusId;
    dto.createdAt = domain.createdAt.toISOString();
    dto.updatedAt = domain.updatedAt.toISOString();
    return dto;
}
let PartnersController = class PartnersController {
    createPartnerUseCase;
    findAllPartnersUseCase;
    findPartnerByExternalIdUseCase;
    updatePartnerByExternalIdUseCase;
    deletePartnerByExternalIdUseCase;
    changePartnerStatusUseCase;
    constructor(createPartnerUseCase, findAllPartnersUseCase, findPartnerByExternalIdUseCase, updatePartnerByExternalIdUseCase, deletePartnerByExternalIdUseCase, changePartnerStatusUseCase) {
        this.createPartnerUseCase = createPartnerUseCase;
        this.findAllPartnersUseCase = findAllPartnersUseCase;
        this.findPartnerByExternalIdUseCase = findPartnerByExternalIdUseCase;
        this.updatePartnerByExternalIdUseCase = updatePartnerByExternalIdUseCase;
        this.deletePartnerByExternalIdUseCase = deletePartnerByExternalIdUseCase;
        this.changePartnerStatusUseCase = changePartnerStatusUseCase;
    }
    async create(body) {
        const payload = {
            businessId: body.businessId,
            acronym: body.acronym,
            logoUrl: body.logoUrl ?? null,
            coBrandingLogoUrl: body.coBrandingLogoUrl ?? null,
            primaryColor: body.primaryColor ?? null,
            secondaryColor: body.secondaryColor ?? null,
            lightColor: body.lightColor ?? null,
            salesRepRoleName: body.salesRepRoleName ?? null,
            salesRepRoleNamePlural: body.salesRepRoleNamePlural ?? null,
            notificationEmail: body.notificationEmail ?? null,
            webhookUrl: body.webhookUrl ?? null,
            sendSalesRepVoucher: body.sendSalesRepVoucher ?? false,
            disbursementNotificationEmail: body.disbursementNotificationEmail ?? null,
            defaultRepId: body.defaultRepId ?? null,
            defaultCategoryId: body.defaultCategoryId,
            statusId: body.statusId,
            categories: this.mapCategories(body.categories),
            defaultCategoryIndex: body.defaultCategoryIndex,
        };
        const created = await this.executeWithUniqueConstraintHandling(() => this.createPartnerUseCase.execute(payload));
        return toResponseDto(created);
    }
    async findAll(query) {
        const partners = await this.findAllPartnersUseCase.execute(query.search);
        return partners.map(toResponseDto);
    }
    findByExternalId(externalId) {
        return this.findByExternalIdHandler(externalId);
    }
    async findByExternalIdHandler(externalId) {
        const partner = await this.findPartnerByExternalIdUseCase.execute(externalId);
        if (!partner) {
            throw new common_1.NotFoundException("Partner not found");
        }
        return toResponseDto(partner);
    }
    async updateByExternalId(externalId, body) {
        const updated = await this.executeWithUniqueConstraintHandling(() => this.updatePartnerByExternalIdUseCase.execute(externalId, {
            businessId: body.businessId,
            acronym: body.acronym,
            logoUrl: body.logoUrl,
            coBrandingLogoUrl: body.coBrandingLogoUrl,
            primaryColor: body.primaryColor,
            secondaryColor: body.secondaryColor,
            lightColor: body.lightColor,
            salesRepRoleName: body.salesRepRoleName,
            salesRepRoleNamePlural: body.salesRepRoleNamePlural,
            notificationEmail: body.notificationEmail,
            webhookUrl: body.webhookUrl,
            sendSalesRepVoucher: body.sendSalesRepVoucher,
            disbursementNotificationEmail: body.disbursementNotificationEmail,
            defaultRepId: body.defaultRepId,
            defaultCategoryId: body.defaultCategoryId,
            statusId: body.statusId,
        }));
        if (!updated) {
            throw new common_1.NotFoundException("Partner not found");
        }
        return toResponseDto(updated);
    }
    async deleteByExternalId(externalId) {
        const deleted = await this.deletePartnerByExternalIdUseCase.execute(externalId);
        if (!deleted) {
            throw new common_1.NotFoundException("Partner not found");
        }
    }
    async changeStatus(externalId, body) {
        const updated = await this.changePartnerStatusUseCase.execute(externalId, body.statusCode);
        if (!updated) {
            throw new common_1.NotFoundException("Partner not found");
        }
        return toResponseDto(updated);
    }
    mapCategories(categories) {
        return categories?.map((category) => ({
            name: category.name,
            discountPercentage: category.discountPercentage,
            interestRate: category.interestRate,
            disbursementFeePercent: category.disbursementFeePercent ?? null,
            minimumDisbursementFee: category.minimumDisbursementFee ?? null,
            delayDays: category.delayDays,
            termDays: category.termDays,
        }));
    }
    async executeWithUniqueConstraintHandling(action) {
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
exports.PartnersController = PartnersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Crear partner" }),
    (0, swagger_1.ApiBody)({ type: create_partner_request_dto_1.CreatePartnerRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Partner creado",
        type: partner_response_dto_1.PartnerResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partner_request_dto_1.CreatePartnerRequestDto]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Listar partners" }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Busca partners por acronimo",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista de partners",
        type: partner_response_dto_1.PartnerResponseDto,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [partner_list_query_dto_1.PartnerListQueryDto]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener partner por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID publico del partner" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Partner encontrado",
        type: partner_response_dto_1.PartnerResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Formato UUID invalido" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Partner no encontrado" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "findByExternalId", null);
__decorate([
    (0, common_1.Patch)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Actualizar partner por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID publico del partner" }),
    (0, swagger_1.ApiBody)({ type: update_partner_request_dto_1.UpdatePartnerRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Partner actualizado",
        type: partner_response_dto_1.PartnerResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Formato UUID invalido" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Partner no encontrado" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_partner_request_dto_1.UpdatePartnerRequestDto]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "updateByExternalId", null);
__decorate([
    (0, common_1.Delete)(":externalId"),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: "Eliminar partner por externalId" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID publico del partner" }),
    (0, swagger_1.ApiResponse)({ status: 204, description: "Partner eliminado" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Formato UUID invalido" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Partner no encontrado" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "deleteByExternalId", null);
__decorate([
    (0, common_1.Patch)(":externalId/status"),
    (0, swagger_1.ApiOperation)({ summary: "Activar o desactivar partner" }),
    (0, swagger_1.ApiParam)({ name: "externalId", description: "UUID publico del partner" }),
    (0, swagger_1.ApiBody)({ type: change_partner_status_request_dto_1.ChangePartnerStatusRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Estado del partner actualizado",
        type: partner_response_dto_1.PartnerResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Body invalido o UUID invalido" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Partner no encontrado" }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_partner_status_request_dto_1.ChangePartnerStatusRequestDto]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "changeStatus", null);
exports.PartnersController = PartnersController = __decorate([
    (0, swagger_1.ApiTags)("partners"),
    (0, common_1.Controller)("partners/register"),
    __metadata("design:paramtypes", [create_partner_use_case_1.CreatePartnerUseCase,
        find_all_partners_use_case_1.FindAllPartnersUseCase,
        find_partner_by_external_id_use_case_1.FindPartnerByExternalIdUseCase,
        update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
        delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
        change_partner_status_use_case_1.ChangePartnerStatusUseCase])
], PartnersController);
//# sourceMappingURL=partners.controller.js.map