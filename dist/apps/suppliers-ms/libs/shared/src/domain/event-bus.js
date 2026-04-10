"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN_EVENT_BUS = exports.DomainEventBus = void 0;
class DomainEventBus {
    handlers = new Map();
    subscribe(event_name, handler) {
        if (!this.handlers.has(event_name)) {
            this.handlers.set(event_name, []);
        }
        this.handlers.get(event_name).push(handler);
    }
    async publish(event) {
        const event_name = event.constructor.name;
        const fns = this.handlers.get(event_name) ?? [];
        await Promise.allSettled(fns.map((fn) => fn(event)));
    }
    async publish_many(events) {
        await Promise.allSettled(events.map((e) => this.publish(e)));
    }
}
exports.DomainEventBus = DomainEventBus;
exports.DOMAIN_EVENT_BUS = Symbol('DOMAIN_EVENT_BUS');
//# sourceMappingURL=event-bus.js.map