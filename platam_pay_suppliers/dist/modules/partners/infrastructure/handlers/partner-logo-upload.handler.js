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
var PartnerLogoUploadHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerLogoUploadHandler = void 0;
const common_1 = require("@nestjs/common");
const partner_events_1 = require("../../domain/events/partner.events");
const partner_logo_storage_port_1 = require("../../application/ports/partner-logo-storage.port");
const event_bus_port_1 = require("../../../../common/ports/event-bus.port");
const event_handler_retry_util_1 = require("../../../../infrastructure/events/event-handler-retry.util");
const LOGO_PREFIX = "partners/logos";
const COBRANDING_PREFIX = "partners/cobranding";
let PartnerLogoUploadHandler = PartnerLogoUploadHandler_1 = class PartnerLogoUploadHandler {
    eventBus;
    logoStorage;
    logger = new common_1.Logger(PartnerLogoUploadHandler_1.name);
    constructor(eventBus, logoStorage) {
        this.eventBus = eventBus;
        this.logoStorage = logoStorage;
    }
    onModuleInit() {
        this.eventBus.subscribe(partner_events_1.PARTNER_EVENTS.LOGO_UPLOAD_REQUESTED, this.handle.bind(this));
    }
    async handle(envelope) {
        const { name, payload, correlation_id } = envelope;
        const pl = payload;
        this.logger.log(`Processing ${name} correlation_id=${correlation_id} business_id=${pl.business_id}`);
        try {
            const logoKey = `${LOGO_PREFIX}/${pl.business_id}/${pl.logo_filename || "logo"}`;
            const coBrandingKey = `${COBRANDING_PREFIX}/${pl.business_id}/${pl.co_branding_logo_filename || "cobranding"}`;
            const [logoResult, coBrandingResult] = await (0, event_handler_retry_util_1.withRetry)(() => Promise.all([
                this.logoStorage.upload({
                    key: logoKey,
                    body: pl.logo_buffer,
                    content_type: pl.logo_content_type,
                }),
                this.logoStorage.upload({
                    key: coBrandingKey,
                    body: pl.co_branding_logo_buffer,
                    content_type: pl.co_branding_logo_content_type,
                }),
            ]), { max_attempts: 3, initial_delay_ms: 500 });
            const completed = {
                name: partner_events_1.PARTNER_EVENTS.LOGO_UPLOAD_COMPLETED,
                payload: {
                    correlation_id: pl.correlation_id,
                    business_id: pl.business_id,
                    logo_url: logoResult.location,
                    co_branding_logo_url: coBrandingResult.location,
                },
                occurred_at: new Date().toISOString(),
                correlation_id: pl.correlation_id,
            };
            this.eventBus.publish(completed);
        }
        catch (err) {
            this.logger.warn(`Logo upload failed correlation_id=${correlation_id}: ${err instanceof Error ? err.message : String(err)}`);
            this.eventBus.publish({
                name: partner_events_1.PARTNER_EVENTS.LOGO_UPLOAD_FAILED,
                payload: { correlation_id: pl.correlation_id, business_id: pl.business_id, error: String(err) },
                occurred_at: new Date().toISOString(),
                correlation_id: pl.correlation_id,
            });
            throw err;
        }
    }
};
exports.PartnerLogoUploadHandler = PartnerLogoUploadHandler;
exports.PartnerLogoUploadHandler = PartnerLogoUploadHandler = PartnerLogoUploadHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_bus_port_1.EVENT_BUS_PORT)),
    __param(1, (0, common_1.Inject)(partner_logo_storage_port_1.PARTNER_LOGO_STORAGE_PORT)),
    __metadata("design:paramtypes", [Object, Object])
], PartnerLogoUploadHandler);
//# sourceMappingURL=partner-logo-upload.handler.js.map