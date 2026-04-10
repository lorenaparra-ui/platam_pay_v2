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
exports.DeleteSalesRepresentativeByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const sales_representatives_tokens_1 = require("../../../sales-representatives.tokens");
let DeleteSalesRepresentativeByExternalIdUseCase = class DeleteSalesRepresentativeByExternalIdUseCase {
    sales_representative_repository;
    constructor(sales_representative_repository) {
        this.sales_representative_repository = sales_representative_repository;
    }
    async execute(req) {
        const ok = await this.sales_representative_repository.delete_by_external_id(req.external_id);
        if (!ok) {
            throw new common_1.NotFoundException('sales representative not found');
        }
    }
};
exports.DeleteSalesRepresentativeByExternalIdUseCase = DeleteSalesRepresentativeByExternalIdUseCase;
exports.DeleteSalesRepresentativeByExternalIdUseCase = DeleteSalesRepresentativeByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteSalesRepresentativeByExternalIdUseCase);
//# sourceMappingURL=delete-sales-representative-by-external-id.use-case.js.map