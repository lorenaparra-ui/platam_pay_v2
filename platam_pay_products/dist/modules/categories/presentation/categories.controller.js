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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_category_request_dto_1 = require("../application/dto/create-category-request.dto");
const update_category_request_dto_1 = require("../application/dto/update-category-request.dto");
const category_response_dto_1 = require("../application/dto/category-response.dto");
const create_category_use_case_1 = require("../application/use-cases/create-category.use-case");
const get_category_by_external_id_use_case_1 = require("../application/use-cases/get-category-by-external-id.use-case");
const list_categories_by_credit_facility_id_use_case_1 = require("../application/use-cases/list-categories-by-credit-facility-id.use-case");
const update_category_use_case_1 = require("../application/use-cases/update-category.use-case");
const delete_category_use_case_1 = require("../application/use-cases/delete-category.use-case");
function to_response(d) {
    const dto = new category_response_dto_1.CategoryResponseDto();
    dto.external_id = d.external_id;
    dto.credit_facility_id = d.credit_facility_id;
    dto.partner_id = d.partner_id;
    dto.name = d.name;
    dto.discount_percentage = d.discount_percentage;
    dto.interest_rate = d.interest_rate;
    dto.disbursement_fee_percent = d.disbursement_fee_percent;
    dto.minimum_disbursement_fee = d.minimum_disbursement_fee;
    dto.delay_days = d.delay_days;
    dto.term_days = d.term_days;
    dto.status_id = d.status_id;
    dto.created_at = d.created_at.toISOString();
    dto.updated_at = d.updated_at.toISOString();
    return dto;
}
let CategoriesController = class CategoriesController {
    create_uc;
    get_by_external_uc;
    list_by_cf_uc;
    update_uc;
    delete_uc;
    constructor(create_uc, get_by_external_uc, list_by_cf_uc, update_uc, delete_uc) {
        this.create_uc = create_uc;
        this.get_by_external_uc = get_by_external_uc;
        this.list_by_cf_uc = list_by_cf_uc;
        this.update_uc = update_uc;
        this.delete_uc = delete_uc;
    }
    async create(body) {
        const created = await this.create_uc.run({
            credit_facility_id: body.credit_facility_id,
            partner_id: body.partner_id ?? null,
            name: body.name,
            delay_days: body.delay_days,
            disbursement_fee_percent: body.disbursement_fee_percent ?? null,
            discount_percentage: body.discount_percentage,
            interest_rate: body.interest_rate,
            minimum_disbursement_fee: body.minimum_disbursement_fee ?? null,
            term_days: body.term_days,
            status_id: body.status_id,
        });
        return to_response(created);
    }
    async list_by_credit_facility(credit_facility_id) {
        const list = await this.list_by_cf_uc.run(credit_facility_id);
        return list.map(to_response);
    }
    async get_one(external_id) {
        const item = await this.get_by_external_uc.run(external_id);
        if (!item) {
            throw new common_1.NotFoundException("Categoría no encontrada");
        }
        return to_response(item);
    }
    async update(external_id, body) {
        const updated = await this.update_uc.run(external_id, {
            partner_id: body.partner_id,
            name: body.name,
            delay_days: body.delay_days,
            disbursement_fee_percent: body.disbursement_fee_percent,
            discount_percentage: body.discount_percentage,
            interest_rate: body.interest_rate,
            minimum_disbursement_fee: body.minimum_disbursement_fee,
            term_days: body.term_days,
            status_id: body.status_id,
        });
        if (!updated) {
            throw new common_1.NotFoundException("Categoría no encontrada");
        }
        return to_response(updated);
    }
    async remove(external_id) {
        const ok = await this.delete_uc.run(external_id);
        if (!ok) {
            throw new common_1.NotFoundException("Categoría no encontrada");
        }
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Crear categoría" }),
    (0, swagger_1.ApiBody)({ type: create_category_request_dto_1.CreateCategoryRequestDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: category_response_dto_1.CategoryResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_request_dto_1.CreateCategoryRequestDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("by-credit-facility/:creditFacilityId"),
    (0, swagger_1.ApiOperation)({ summary: "Listar categorías por línea de crédito (id interno)" }),
    (0, swagger_1.ApiParam)({ name: "creditFacilityId" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: category_response_dto_1.CategoryResponseDto, isArray: true }),
    __param(0, (0, common_1.Param)("creditFacilityId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "list_by_credit_facility", null);
__decorate([
    (0, common_1.Get)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener categoría por external_id (UUID)" }),
    (0, swagger_1.ApiParam)({ name: "externalId" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: category_response_dto_1.CategoryResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "get_one", null);
__decorate([
    (0, common_1.Patch)(":externalId"),
    (0, swagger_1.ApiOperation)({ summary: "Actualizar categoría" }),
    (0, swagger_1.ApiParam)({ name: "externalId" }),
    (0, swagger_1.ApiBody)({ type: update_category_request_dto_1.UpdateCategoryRequestDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: category_response_dto_1.CategoryResponseDto }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_request_dto_1.UpdateCategoryRequestDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":externalId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Eliminar categoría" }),
    (0, swagger_1.ApiParam)({ name: "externalId" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)("externalId", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)("categories"),
    (0, common_1.Controller)("categories"),
    __metadata("design:paramtypes", [create_category_use_case_1.CreateCategoryUseCase,
        get_category_by_external_id_use_case_1.GetCategoryByExternalIdUseCase,
        list_categories_by_credit_facility_id_use_case_1.ListCategoriesByCreditFacilityIdUseCase,
        update_category_use_case_1.UpdateCategoryUseCase,
        delete_category_use_case_1.DeleteCategoryUseCase])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map