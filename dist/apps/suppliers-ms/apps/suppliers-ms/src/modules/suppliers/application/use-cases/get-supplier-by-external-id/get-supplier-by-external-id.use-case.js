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
exports.GetSupplierByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const suppliers_tokens_1 = require("../../../suppliers.tokens");
const supplier_public_fields_builder_1 = require("../../mapping/supplier-public-fields.builder");
const get_supplier_by_external_id_response_1 = require("./get-supplier-by-external-id.response");
let GetSupplierByExternalIdUseCase = class GetSupplierByExternalIdUseCase {
    supplier_repository;
    lookup;
    constructor(supplier_repository, lookup) {
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const row = await this.supplier_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('supplier not found');
        }
        const fields = await (0, supplier_public_fields_builder_1.build_supplier_public_fields)(row, this.lookup);
        return new get_supplier_by_external_id_response_1.GetSupplierByExternalIdResponse(fields);
    }
};
exports.GetSupplierByExternalIdUseCase = GetSupplierByExternalIdUseCase;
exports.GetSupplierByExternalIdUseCase = GetSupplierByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], GetSupplierByExternalIdUseCase);
//# sourceMappingURL=get-supplier-by-external-id.use-case.js.map