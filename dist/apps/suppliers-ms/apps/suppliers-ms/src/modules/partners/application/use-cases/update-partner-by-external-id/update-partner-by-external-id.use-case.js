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
exports.UpdatePartnerByExternalIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const partners_tokens_1 = require("../../../partners.tokens");
const partner_public_fields_builder_1 = require("../../mapping/partner-public-fields.builder");
const update_partner_by_external_id_response_1 = require("./update-partner-by-external-id.response");
let UpdatePartnerByExternalIdUseCase = class UpdatePartnerByExternalIdUseCase {
    partner_repository;
    lookup;
    constructor(partner_repository, lookup) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
    }
    async execute(req) {
        const patch = {};
        if (req.acronym !== undefined) {
            patch.acronym = req.acronym;
        }
        if (req.logo_url !== undefined) {
            patch.logo_url = req.logo_url;
        }
        if (req.co_branding_logo_url !== undefined) {
            patch.co_branding_logo_url = req.co_branding_logo_url;
        }
        if (req.primary_color !== undefined) {
            patch.primary_color = req.primary_color;
        }
        if (req.secondary_color !== undefined) {
            patch.secondary_color = req.secondary_color;
        }
        if (req.light_color !== undefined) {
            patch.light_color = req.light_color;
        }
        if (req.notification_email !== undefined) {
            patch.notification_email = req.notification_email;
        }
        if (req.webhook_url !== undefined) {
            patch.webhook_url = req.webhook_url;
        }
        if (req.send_sales_rep_voucher !== undefined) {
            patch.send_sales_rep_voucher = req.send_sales_rep_voucher;
        }
        if (req.disbursement_notification_email !== undefined) {
            patch.disbursement_notification_email =
                req.disbursement_notification_email;
        }
        if (req.state !== undefined) {
            patch.state = req.state;
        }
        const updated = await this.partner_repository.update_by_external_id(req.external_id, patch);
        if (updated === null) {
            throw new common_1.NotFoundException('partner not found');
        }
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(updated, this.lookup);
        return new update_partner_by_external_id_response_1.UpdatePartnerByExternalIdResponse(fields);
    }
};
exports.UpdatePartnerByExternalIdUseCase = UpdatePartnerByExternalIdUseCase;
exports.UpdatePartnerByExternalIdUseCase = UpdatePartnerByExternalIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __metadata("design:paramtypes", [Object, Object])
], UpdatePartnerByExternalIdUseCase);
//# sourceMappingURL=update-partner-by-external-id.use-case.js.map