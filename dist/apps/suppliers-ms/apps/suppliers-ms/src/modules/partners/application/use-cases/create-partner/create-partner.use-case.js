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
exports.CreatePartnerUseCase = void 0;
const common_1 = require("@nestjs/common");
const suppliers_reference_lookup_port_1 = require("../../../../../common/ports/suppliers-reference-lookup.port");
const partners_tokens_1 = require("../../../partners.tokens");
const partner_public_fields_builder_1 = require("../../mapping/partner-public-fields.builder");
const partner_created_event_1 = require("../../../domain/events/partner-created.event");
const shared_1 = require("../../../../../../../../libs/shared/src");
const create_partner_response_1 = require("./create-partner.response");
let CreatePartnerUseCase = class CreatePartnerUseCase {
    partner_repository;
    lookup;
    event_bus;
    constructor(partner_repository, lookup, event_bus) {
        this.partner_repository = partner_repository;
        this.lookup = lookup;
        this.event_bus = event_bus;
    }
    async execute(req) {
        const created = await this.partner_repository.create({
            supplier_id: req.supplier_internal_id,
            acronym: req.acronym,
            logo_url: req.logo_url,
            co_branding_logo_url: req.co_branding_logo_url,
            primary_color: req.primary_color,
            secondary_color: req.secondary_color,
            light_color: req.light_color,
            notification_email: req.notification_email,
            webhook_url: req.webhook_url,
            send_sales_rep_voucher: req.send_sales_rep_voucher,
            disbursement_notification_email: req.disbursement_notification_email,
        });
        await this.event_bus?.publish(new partner_created_event_1.PartnerCreatedEvent(created.external_id, created.supplier_id));
        const fields = await (0, partner_public_fields_builder_1.build_partner_public_fields)(created, this.lookup);
        return new create_partner_response_1.CreatePartnerResponse(fields);
    }
};
exports.CreatePartnerUseCase = CreatePartnerUseCase;
exports.CreatePartnerUseCase = CreatePartnerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(partners_tokens_1.PARTNER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(suppliers_reference_lookup_port_1.SUPPLIERS_REFERENCE_LOOKUP)),
    __param(2, (0, common_1.Optional)()),
    __param(2, (0, common_1.Inject)(shared_1.DOMAIN_EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object, Function])
], CreatePartnerUseCase);
//# sourceMappingURL=create-partner.use-case.js.map