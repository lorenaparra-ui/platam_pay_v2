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
const create_sales_representative_request_dto_1 = require("../application/dto/create-sales-representative-request.dto");
const create_sales_representative_use_case_1 = require("../application/use-cases/create-sales-representative.use-case");
const sales_representative_repository_port_1 = require("../domain/ports/sales-representative.repository.port");
let SalesRepresentativesController = class SalesRepresentativesController {
    createSalesRepresentativeUseCase;
    repository;
    constructor(createSalesRepresentativeUseCase, repository) {
        this.createSalesRepresentativeUseCase = createSalesRepresentativeUseCase;
        this.repository = repository;
    }
    async create(body) {
        return this.createSalesRepresentativeUseCase.execute(body);
    }
    async listByPartner(partnerId) {
        return this.repository.findByPartnerId(partnerId);
    }
};
exports.SalesRepresentativesController = SalesRepresentativesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear asesor comercial asociado a un partner' }),
    (0, swagger_1.ApiBody)({ type: create_sales_representative_request_dto_1.CreateSalesRepresentativeRequestDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Representante creado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Usuario ya asignado a otro rep' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sales_representative_request_dto_1.CreateSalesRepresentativeRequestDto]),
    __metadata("design:returntype", Promise)
], SalesRepresentativesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('by-partner/:partnerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar representantes por partner' }),
    (0, swagger_1.ApiParam)({ name: 'partnerId', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de representantes' }),
    __param(0, (0, common_1.Param)('partnerId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SalesRepresentativesController.prototype, "listByPartner", null);
exports.SalesRepresentativesController = SalesRepresentativesController = __decorate([
    (0, swagger_1.ApiTags)('sales-representatives'),
    (0, common_1.Controller)('sales-representatives'),
    __param(1, (0, common_1.Inject)(sales_representative_repository_port_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __metadata("design:paramtypes", [create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase, Object])
], SalesRepresentativesController);
//# sourceMappingURL=sales-representatives.controller.js.map