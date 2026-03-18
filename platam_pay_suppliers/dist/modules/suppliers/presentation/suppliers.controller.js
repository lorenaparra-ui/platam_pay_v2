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
exports.SuppliersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_supplier_use_case_1 = require("../application/use-cases/create-supplier.use-case");
const find_supplier_by_business_id_use_case_1 = require("../application/use-cases/find-supplier-by-business-id.use-case");
const create_purchase_order_use_case_1 = require("../application/use-cases/create-purchase-order.use-case");
const create_supplier_request_dto_1 = require("../application/dto/create-supplier-request.dto");
const create_purchase_order_request_dto_1 = require("../application/dto/create-purchase-order-request.dto");
let SuppliersController = class SuppliersController {
    createSupplierUseCase;
    findSupplierByBusinessIdUseCase;
    createPurchaseOrderUseCase;
    constructor(createSupplierUseCase, findSupplierByBusinessIdUseCase, createPurchaseOrderUseCase) {
        this.createSupplierUseCase = createSupplierUseCase;
        this.findSupplierByBusinessIdUseCase = findSupplierByBusinessIdUseCase;
        this.createPurchaseOrderUseCase = createPurchaseOrderUseCase;
    }
    async create(dto) {
        return this.createSupplierUseCase.execute({
            businessId: dto.businessId,
            bankAccount: dto.bankAccount ?? null,
        });
    }
    async findByBusinessId(businessId) {
        const id = Number(businessId);
        return this.findSupplierByBusinessIdUseCase.execute(id);
    }
    async createPurchaseOrder(dto) {
        return this.createPurchaseOrderUseCase.execute({
            userId: dto.userId,
            supplierId: dto.supplierId,
            amount: dto.amount,
            documentUrl: dto.documentUrl ?? null,
        });
    }
};
exports.SuppliersController = SuppliersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Crear supplier (1:1 con business)" }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_supplier_request_dto_1.CreateSupplierRequestDto]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("by-business/:businessId"),
    (0, swagger_1.ApiOperation)({ summary: "Obtener supplier por business_id" }),
    __param(0, (0, common_1.Param)("businessId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findByBusinessId", null);
__decorate([
    (0, common_1.Post)("purchase-orders"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "Crear orden de compra" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_order_request_dto_1.CreatePurchaseOrderRequestDto]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "createPurchaseOrder", null);
exports.SuppliersController = SuppliersController = __decorate([
    (0, swagger_1.ApiTags)("suppliers"),
    (0, common_1.Controller)("suppliers"),
    __metadata("design:paramtypes", [create_supplier_use_case_1.CreateSupplierUseCase,
        find_supplier_by_business_id_use_case_1.FindSupplierByBusinessIdUseCase,
        create_purchase_order_use_case_1.CreatePurchaseOrderUseCase])
], SuppliersController);
//# sourceMappingURL=suppliers.controller.js.map