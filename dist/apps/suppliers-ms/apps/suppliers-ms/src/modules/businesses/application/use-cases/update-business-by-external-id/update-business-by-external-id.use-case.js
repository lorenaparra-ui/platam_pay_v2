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
exports.UpdateBusinessByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const businesses_tokens_1 = require("../../../businesses.tokens");
const business_public_fields_builder_1 = require("../../mapping/business-public-fields.builder");
const update_business_by_external_id_response_1 = require("./update-business-by-external-id.response");
let UpdateBusinessByExternalIdUseCase = class UpdateBusinessByExternalIdUseCase {
    business_repository;
    lookup;
    constructor(business_repository, lookup) {
        this.business_repository = business_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.person_external_id !== undefined) {
            const id = await this.lookup.get_person_internal_id_by_external_id(req.person_external_id);
            if (id === null) {
                throw new common_1.NotFoundException('person not found');
            }
            patch.person_id = id;
        }
        if (req.city_external_id !== undefined) {
            if (req.city_external_id === null) {
                patch.city_id = null;
            }
            else {
                const id = await this.lookup.get_city_internal_id_by_external_id(req.city_external_id);
                if (id === null) {
                    throw new common_1.NotFoundException('city not found');
                }
                patch.city_id = id;
            }
        }
        if (req.entity_type !== undefined) {
            patch.entity_type = req.entity_type;
        }
        if (req.business_name !== undefined) {
            patch.business_name = req.business_name;
        }
        if (req.business_address !== undefined) {
            patch.business_address = req.business_address;
        }
        if (req.business_type !== undefined) {
            patch.business_type = req.business_type;
        }
        if (req.relationship_to_business !== undefined) {
            patch.relationship_to_business = req.relationship_to_business;
        }
        if (req.legal_name !== undefined) {
            patch.legal_name = req.legal_name;
        }
        if (req.trade_name !== undefined) {
            patch.trade_name = req.trade_name;
        }
        if (req.tax_id !== undefined) {
            patch.tax_id = req.tax_id;
        }
        if (req.year_of_establishment !== undefined) {
            patch.year_of_establishment = req.year_of_establishment;
        }
        const updated = await this.business_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('business not found');
        }
        const fields = await (0, business_public_fields_builder_1.build_business_public_fields)(updated, this.lookup);
        return new update_business_by_external_id_response_1.UpdateBusinessByExternalIdResponse(fields);
    }
};
exports.UpdateBusinessByExternalIdUseCase = UpdateBusinessByExternalIdUseCase;
exports.UpdateBusinessByExternalIdUseCase = UpdateBusinessByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateBusinessByExternalIdUseCase);
//# sourceMappingURL=update-business-by-external-id.use-case.js.map