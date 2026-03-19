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
var PartnerUserCreateHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerUserCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const partner_events_1 = require("../../domain/events/partner.events");
const event_bus_port_1 = require("../../../../common/ports/event-bus.port");
const partner_user_creator_port_1 = require("../../application/ports/partner-user-creator.port");
let PartnerUserCreateHandler = PartnerUserCreateHandler_1 = class PartnerUserCreateHandler {
    eventBus;
    userCreator;
    logger = new common_1.Logger(PartnerUserCreateHandler_1.name);
    constructor(eventBus, userCreator) {
        this.eventBus = eventBus;
        this.userCreator = userCreator;
    }
    onModuleInit() {
        this.eventBus.subscribe(partner_events_1.PARTNER_EVENTS.USER_CREATE_REQUESTED, this.handle.bind(this));
    }
    async handle(envelope) {
        const payload = envelope.payload;
        this.logger.log(`Processing ${envelope.name} correlation_id=${payload.correlation_id} business_id=${payload.business_id}`);
        try {
            await this.userCreator.createUser({
                first_name: payload.first_name,
                last_name: payload.last_name,
                document_type: payload.document_type,
                document_number: payload.document_number,
                email: payload.email,
                phone: payload.phone,
                business_id: payload.business_id,
                partner_external_id: payload.partner_external_id,
            });
        }
        catch (err) {
            this.logger.error(`User create failed correlation_id=${payload.correlation_id}: ${err instanceof Error ? err.message : String(err)}`);
            throw err;
        }
    }
};
exports.PartnerUserCreateHandler = PartnerUserCreateHandler;
exports.PartnerUserCreateHandler = PartnerUserCreateHandler = PartnerUserCreateHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_bus_port_1.EVENT_BUS_PORT)),
    __param(1, (0, common_1.Inject)(partner_user_creator_port_1.PARTNER_USER_CREATOR)),
    __metadata("design:paramtypes", [Object, Object])
], PartnerUserCreateHandler);
//# sourceMappingURL=partner-user-create.handler.js.map