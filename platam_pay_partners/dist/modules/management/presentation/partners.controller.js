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
const create_partner_request_dto_1 = require("../application/dto/create-partner-request.dto");
const partner_response_dto_1 = require("../application/dto/partner-response.dto");
const update_partner_request_dto_1 = require("../application/dto/update-partner-request.dto");
const partner_repository_port_1 = require("../domain/ports/partner.repository.port");
function toResponseDto(domain) {
    const dto = new partner_response_dto_1.PartnerResponseDto();
    dto.externalId = domain.externalId;
    dto.countryCode = domain.countryCode;
    dto.companyName = domain.companyName;
    dto.tradeName = domain.tradeName;
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
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    getCrudRepository() {
        const repository = this.repository;
        if (typeof repository.create !== "function" ||
            typeof repository.updateByExternalId !== "function" ||
            typeof repository.deleteByExternalId !== "function") {
            throw new common_1.NotImplementedException("CRUD methods are not implemented in PartnerRepositoryPort adapter");
        }
        return repository;
    }
    async create(body) {
        const created = await this.getCrudRepository().create({
            countryCode: body.countryCode ?? null,
            companyName: body.companyName,
            tradeName: body.tradeName ?? null,
            acronym: body.acronym ?? null,
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
            defaultCategoryId: body.defaultCategoryId ?? null,
            statusId: body.statusId,
        });
        return toResponseDto(created);
    }
    async findAll() {
        const partners = await this.repository.findAll();
        return partners.map(toResponseDto);
    }
    findByExternalId(externalId) {
        return this.findByExternalIdHandler(externalId);
    }
    async findByExternalIdHandler(externalId) {
        const partner = await this.repository.findByExternalId(externalId);
        if (!partner) {
            throw new common_1.NotFoundException("Partner not found");
        }
        return toResponseDto(partner);
    }
    async updateByExternalId(externalId, body) {
        const updated = await this.getCrudRepository().updateByExternalId(externalId, {
            countryCode: body.countryCode,
            companyName: body.companyName,
            tradeName: body.tradeName,
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
        });
        if (!updated) {
            throw new common_1.NotFoundException("Partner not found");
        }
        return toResponseDto(updated);
    }
    async deleteByExternalId(externalId) {
        const deleted = await this.getCrudRepository().deleteByExternalId(externalId);
        if (!deleted) {
            throw new common_1.NotFoundException("Partner not found");
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
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista de partners",
        type: partner_response_dto_1.PartnerResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
exports.PartnersController = PartnersController = __decorate([
    (0, swagger_1.ApiTags)("partners"),
    (0, common_1.Controller)("partners/register"),
    __param(0, (0, common_1.Inject)(partner_repository_port_1.PARTNERS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], PartnersController);
//# sourceMappingURL=partners.controller.js.map