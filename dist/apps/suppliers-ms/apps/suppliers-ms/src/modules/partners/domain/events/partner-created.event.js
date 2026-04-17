"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerCreatedEvent = void 0;
const shared_1 = require("../../../../../../../libs/shared/src");
class PartnerCreatedEvent {
    partner_external_id;
    supplier_id;
    correlation_id;
    eventId;
    occurredAt;
    aggregateId;
    constructor(partner_external_id, supplier_id, correlation_id) {
        this.partner_external_id = partner_external_id;
        this.supplier_id = supplier_id;
        this.correlation_id = correlation_id;
        this.eventId = (0, shared_1.new_uuid)();
        this.occurredAt = new Date();
        this.aggregateId = partner_external_id;
    }
}
exports.PartnerCreatedEvent = PartnerCreatedEvent;
//# sourceMappingURL=partner-created.event.js.map