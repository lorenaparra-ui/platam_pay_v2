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
exports.ListSalesRepresentativesUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const sales_representatives_tokens_1 = require("../../../sales-representatives.tokens");
const sales_representative_public_fields_builder_1 = require("../../mapping/sales-representative-public-fields.builder");
let ListSalesRepresentativesUseCase = class ListSalesRepresentativesUseCase {
    sales_representative_repository;
    lookup;
    constructor(sales_representative_repository, lookup) {
        this.sales_representative_repository = sales_representative_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        let partner_id_filter;
        if (req.partner_external_id !== undefined) {
            const trimmed = req.partner_external_id.trim();
            if (trimmed.length === 0) {
                throw new common_1.BadRequestException('partner_external_id invalid');
            }
            const resolved = await this.lookup.get_partner_internal_id_by_external_id(trimmed);
            if (resolved === null) {
                throw new common_1.BadRequestException('partner not found');
            }
            partner_id_filter = resolved;
        }
        const rows = await this.sales_representative_repository.find_all(partner_id_filter);
        const out = [];
        for (const row of rows) {
            const fields = await (0, sales_representative_public_fields_builder_1.build_sales_representative_public_fields)(row, this.lookup);
            if (fields === null) {
                throw new common_1.InternalServerErrorException();
            }
            out.push(fields);
        }
        return out;
    }
};
exports.ListSalesRepresentativesUseCase = ListSalesRepresentativesUseCase;
exports.ListSalesRepresentativesUseCase = ListSalesRepresentativesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], ListSalesRepresentativesUseCase);
//# sourceMappingURL=list-sales-representatives.use-case.js.map