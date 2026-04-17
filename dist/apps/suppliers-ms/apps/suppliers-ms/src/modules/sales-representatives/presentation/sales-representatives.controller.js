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
exports.SalesRepresentativesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_sales_representative_use_case_1 = require("../application/use-cases/create-sales-representative/create-sales-representative.use-case");
const create_sales_representative_request_1 = require("../application/use-cases/create-sales-representative/create-sales-representative.request");
const get_sales_representative_by_external_id_use_case_1 = require("../application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case");
const get_sales_representative_by_external_id_request_1 = require("../application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.request");
const list_sales_representatives_use_case_1 = require("../application/use-cases/list-sales-representatives/list-sales-representatives.use-case");
const list_sales_representatives_request_1 = require("../application/use-cases/list-sales-representatives/list-sales-representatives.request");
const update_sales_representative_by_external_id_use_case_1 = require("../application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case");
const update_sales_representative_by_external_id_request_1 = require("../application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.request");
const delete_sales_representative_by_external_id_use_case_1 = require("../application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case");
const delete_sales_representative_by_external_id_request_1 = require("../application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.request");
const create_sales_representative_body_dto_1 = require("./dto/create-sales-representative-body.dto");
const patch_sales_representative_body_dto_1 = require("./dto/patch-sales-representative-body.dto");
const list_sales_representatives_query_dto_1 = require("./dto/list-sales-representatives-query.dto");
const sales_representative_response_dto_1 = require("./dto/sales-representative-response.dto");
let SalesRepresentativesController = class SalesRepresentativesController {
    create_sales_representative;
    get_by_external_id;
    list_sales_representatives;
    update_by_external_id;
    delete_by_external_id;
    constructor(create_sales_representative, get_by_external_id, list_sales_representatives, update_by_external_id, delete_by_external_id) {
        this.create_sales_representative = create_sales_representative;
        this.get_by_external_id = get_by_external_id;
        this.list_sales_representatives = list_sales_representatives;
        this.update_by_external_id = update_by_external_id;
        this.delete_by_external_id = delete_by_external_id;
    }
    async list(query) {
        return this.list_sales_representatives.execute(new list_sales_representatives_request_1.ListSalesRepresentativesRequest(query.partner_external_id));
    }
    async create(body) {
        return this.create_sales_representative.execute(new create_sales_representative_request_1.CreateSalesRepresentativeRequest(body.partner_external_id, body.user_external_id));
    }
    async get_one(external_id) {
        return this.get_by_external_id.execute(new get_sales_representative_by_external_id_request_1.GetSalesRepresentativeByExternalIdRequest(external_id));
    }
    async patch(external_id, body) {
        return this.update_by_external_id.execute(new update_sales_representative_by_external_id_request_1.UpdateSalesRepresentativeUserByExternalIdRequest(external_id, body.user_external_id));
    }
    async remove(external_id) {
        await this.delete_by_external_id.execute(new delete_sales_representative_by_external_id_request_1.DeleteSalesRepresentativeByExternalIdRequest(external_id));
    }
};
exports.SalesRepresentativesController = SalesRepresentativesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar representantes de ventas',
        description: 'Lista todos los representantes, o filtra por `partner_external_id` si se envía en query.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: [sales_representative_response_dto_1.SalesRepresentativeResponseDto] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_sales_representatives_query_dto_1.ListSalesRepresentativesQueryDto]),
    __metadata("design:returntype", Promise)
], SalesRepresentativesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear representante de ventas' }),
    (0, swagger_1.ApiCreatedResponse)({ type: sales_representative_response_dto_1.SalesRepresentativeResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sales_representative_body_dto_1.CreateSalesRepresentativeBodyDto]),
    __metadata("design:returntype", Promise)
], SalesRepresentativesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':external_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener representante por external_id' }),
    (0, swagger_1.ApiOkResponse)({ type: sales_representative_response_dto_1.SalesRepresentativeResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesRepresentativesController.prototype, "get_one", null);
__decorate([
    (0, common_1.Patch)(':external_id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar vínculo de usuario del representante',
        description: 'Envíe `user_external_id` (UUID) o `null` para desvincular. El campo debe incluirse en el cuerpo.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: sales_representative_response_dto_1.SalesRepresentativeResponseDto }),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patch_sales_representative_body_dto_1.PatchSalesRepresentativeBodyDto]),
    __metadata("design:returntype", Promise)
], SalesRepresentativesController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':external_id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar representante por external_id' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('external_id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesRepresentativesController.prototype, "remove", null);
exports.SalesRepresentativesController = SalesRepresentativesController = __decorate([
    (0, swagger_1.ApiTags)('sales-representatives'),
    (0, swagger_1.ApiExtraModels)(create_sales_representative_body_dto_1.CreateSalesRepresentativeBodyDto, patch_sales_representative_body_dto_1.PatchSalesRepresentativeBodyDto, sales_representative_response_dto_1.SalesRepresentativeResponseDto),
    (0, common_1.Controller)('sales-representatives'),
    __metadata("design:paramtypes", [create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase,
        get_sales_representative_by_external_id_use_case_1.GetSalesRepresentativeByExternalIdUseCase,
        list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase,
        update_sales_representative_by_external_id_use_case_1.UpdateSalesRepresentativeByExternalIdUseCase,
        delete_sales_representative_by_external_id_use_case_1.DeleteSalesRepresentativeByExternalIdUseCase])
], SalesRepresentativesController);
//# sourceMappingURL=sales-representatives.controller.js.map