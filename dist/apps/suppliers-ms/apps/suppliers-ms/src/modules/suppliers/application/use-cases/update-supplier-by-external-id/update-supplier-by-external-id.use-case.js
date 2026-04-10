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
exports.UpdateSupplierByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const suppliers_tokens_1 = require("../../../suppliers.tokens");
const supplier_public_fields_builder_1 = require("../../mapping/supplier-public-fields.builder");
const update_supplier_by_external_id_response_1 = require("./update-supplier-by-external-id.response");
let UpdateSupplierByExternalIdUseCase = class UpdateSupplierByExternalIdUseCase {
    supplier_repository;
    lookup;
    constructor(supplier_repository, lookup) {
        this.supplier_repository = supplier_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.bank_account_external_id !== undefined) {
            if (req.bank_account_external_id === null) {
                patch.bank_account_id = null;
            }
            else {
                const id = await this.lookup.get_bank_account_internal_id_by_external_id(req.bank_account_external_id);
                if (id === null) {
                    throw new common_1.NotFoundException('bank account not found');
                }
                patch.bank_account_id = id;
            }
        }
        const updated = await this.supplier_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('supplier not found');
        }
        const fields = await (0, supplier_public_fields_builder_1.build_supplier_public_fields)(updated, this.lookup);
        return new update_supplier_by_external_id_response_1.UpdateSupplierByExternalIdResponse(fields);
    }
};
exports.UpdateSupplierByExternalIdUseCase = UpdateSupplierByExternalIdUseCase;
exports.UpdateSupplierByExternalIdUseCase = UpdateSupplierByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(suppliers_tokens_1.SUPPLIER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateSupplierByExternalIdUseCase);
//# sourceMappingURL=update-supplier-by-external-id.use-case.js.map