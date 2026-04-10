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
exports.GetPartnerByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const partners_tokens_1 = require("../../../partners.tokens");
const partner_public_fields_builder_1 = require("../../mapping/partner-public-fields.builder");
const get_partner_by_external_id_response_1 = require("./get-partner-by-external-id.response");
let GetPartnerByExternalIdUseCase = class GetPartnerByExternalIdUseCase {
    partner_repository;
    lookup;
    constructor(partner_repository, lookup) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const row = await this.partner_repository.find_by_external_id(req.external_id);
        if (row === null) {
            throw new common_1.NotFoundException('partner not found');
        }
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(row, this.lookup);
        return new get_partner_by_external_id_response_1.GetPartnerByExternalIdResponse(fields);
    }
};
exports.GetPartnerByExternalIdUseCase = GetPartnerByExternalIdUseCase;
exports.GetPartnerByExternalIdUseCase = GetPartnerByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], GetPartnerByExternalIdUseCase);
//# sourceMappingURL=get-partner-by-external-id.use-case.js.map