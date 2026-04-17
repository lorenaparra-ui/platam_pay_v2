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
exports.PartnersPublicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shared_1 = require("../../../../../../libs/shared/src");
const get_partner_by_external_id_use_case_1 = require("../application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case");
const get_partner_by_external_id_request_1 = require("../application/use-cases/get-partner-by-external-id/get-partner-by-external-id.request");
const list_sales_representatives_use_case_1 = require("../../sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case");
const list_sales_representatives_request_1 = require("../../sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request");
const partner_public_camel_response_dto_1 = require("./dto/partner-public-camel-response.dto");
const sales_representative_response_dto_1 = require("../../sales-representatives/presentation/dto/sales-representative-response.dto");
let PartnersPublicController = class PartnersPublicController {
    get_partner;
    list_sales_representatives;
    constructor(get_partner, list_sales_representatives) {
        this.get_partner = get_partner;
        this.list_sales_representatives = list_sales_representatives;
    }
    async list_sales_representatives_by_partner(partner_external_id) {
        await this.assert_active_partner(partner_external_id);
        return this.list_sales_representatives.execute(new list_sales_representatives_request_1.ListSalesRepresentativesRequest(partner_external_id));
    }
    async get_by_external_id(id) {
        const res = await this.get_partner.execute(new get_partner_by_external_id_request_1.GetPartnerByExternalIdRequest(id));
        if (res.state !== shared_1.PartnerState.ACTIVE) {
            throw new common_1.NotFoundException('partner not found');
        }
        return partner_public_camel_response_dto_1.PartnerPublicCamelResponseDto.from(res);
    }
    async assert_active_partner(partner_external_id) {
        const res = await this.get_partner.execute(new get_partner_by_external_id_request_1.GetPartnerByExternalIdRequest(partner_external_id));
        if (res.state !== shared_1.PartnerState.ACTIVE) {
            throw new common_1.NotFoundException('partner not found');
        }
    }
};
exports.PartnersPublicController = PartnersPublicController;
__decorate([
    (0, common_1.Get)(':id/sales-representatives'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar representantes de ventas del partner (público)',
        description: 'Solo disponible si el partner existe y está `active`. Misma forma que GET /sales-representatives?partner_external_id=.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de representantes',
        type: [sales_representative_response_dto_1.SalesRepresentativeResponseDto],
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnersPublicController.prototype, "list_sales_representatives_by_partner", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener partner por external_id (público)',
        description: 'Retorna el partner solo si `state` es **active**; en caso contrario 404. Campos públicos en camelCase.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Partner encontrado',
        type: partner_public_camel_response_dto_1.PartnerPublicCamelResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnersPublicController.prototype, "get_by_external_id", null);
exports.PartnersPublicController = PartnersPublicController = __decorate([
    (0, swagger_1.ApiTags)('partners'),
    (0, common_1.Controller)('partners'),
    __metadata("design:paramtypes", [get_partner_by_external_id_use_case_1.GetPartnerByExternalIdUseCase,
        list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase])
], PartnersPublicController);
//# sourceMappingURL=partners-public.controller.js.map