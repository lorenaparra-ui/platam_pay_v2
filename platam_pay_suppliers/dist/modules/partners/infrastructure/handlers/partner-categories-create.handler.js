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
var PartnerCategoriesCreateHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerCategoriesCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const partner_events_1 = require("../../domain/events/partner.events");
const event_bus_port_1 = require("../../../../common/ports/event-bus.port");
const partner_categories_service_port_1 = require("../../application/ports/partner-categories-service.port");
let PartnerCategoriesCreateHandler = PartnerCategoriesCreateHandler_1 = class PartnerCategoriesCreateHandler {
    eventBus;
    categoriesService;
    logger = new common_1.Logger(PartnerCategoriesCreateHandler_1.name);
    constructor(eventBus, categoriesService) {
        this.eventBus = eventBus;
        this.categoriesService = categoriesService;
    }
    onModuleInit() {
        this.eventBus.subscribe(partner_events_1.PARTNER_EVENTS.CATEGORIES_CREATE_REQUESTED, this.handle.bind(this));
    }
    async handle(envelope) {
        const payload = envelope.payload;
        this.logger.log(`Processing ${envelope.name} correlation_id=${payload.correlation_id} partner_id=${payload.partner_id}`);
        try {
            await this.categoriesService.createCreditFacilityAndCategories({
                partner_id: payload.partner_id,
                partner_external_id: payload.partner_external_id,
                business_id: payload.business_id,
                categories: payload.categories.map((c) => ({
                    name: c.name,
                    term_days: c.term_days,
                    delay_days: c.delay_days,
                    discount_percentage: c.discount_percentage,
                    interest_rate: c.interest_rate,
                    disbursement_fee_percent: c.disbursement_fee_percent,
                    minimum_disbursement_fee: c.minimum_disbursement_fee,
                })),
            });
        }
        catch (err) {
            this.logger.error(`Categories create failed correlation_id=${payload.correlation_id}: ${err instanceof Error ? err.message : String(err)}`);
            throw err;
        }
    }
};
exports.PartnerCategoriesCreateHandler = PartnerCategoriesCreateHandler;
exports.PartnerCategoriesCreateHandler = PartnerCategoriesCreateHandler = PartnerCategoriesCreateHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_bus_port_1.EVENT_BUS_PORT)),
    __param(1, (0, common_1.Inject)(partner_categories_service_port_1.PARTNER_CATEGORIES_SERVICE)),
    __metadata("design:paramtypes", [Object, Object])
], PartnerCategoriesCreateHandler);
//# sourceMappingURL=partner-categories-create.handler.js.map