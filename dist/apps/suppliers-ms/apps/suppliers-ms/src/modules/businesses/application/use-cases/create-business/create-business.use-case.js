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
exports.CreateBusinessUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const businesses_tokens_1 = require("../../../businesses.tokens");
const business_public_fields_builder_1 = require("../../mapping/business-public-fields.builder");
const create_business_response_1 = require("./create-business.response");
let CreateBusinessUseCase = class CreateBusinessUseCase {
    business_repository;
    lookup;
    constructor(business_repository, lookup) {
        this.business_repository = business_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        let city_id = null;
        if (req.city_external_id !== null) {
            const c_id = await this.lookup.get_city_internal_id_by_external_id(req.city_external_id);
            if (c_id === null) {
                throw new common_1.NotFoundException('city not found');
            }
            city_id = c_id;
        }
        const created = await this.business_repository.create({
            person_id: req.person_internal_id,
            city_id,
            entity_type: req.entity_type,
            business_name: req.business_name,
            business_address: req.business_address,
            business_type: req.business_type,
            relationship_to_business: req.relationship_to_business,
            legal_name: req.legal_name,
            trade_name: req.trade_name,
            tax_id: req.tax_id,
            year_of_establishment: req.year_of_establishment,
        });
        const fields = await (0, business_public_fields_builder_1.build_business_public_fields)(created, this.lookup);
        return new create_business_response_1.CreateBusinessResponse(fields);
    }
};
exports.CreateBusinessUseCase = CreateBusinessUseCase;
exports.CreateBusinessUseCase = CreateBusinessUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(businesses_tokens_1.BUSINESS_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], CreateBusinessUseCase);
//# sourceMappingURL=create-business.use-case.js.map