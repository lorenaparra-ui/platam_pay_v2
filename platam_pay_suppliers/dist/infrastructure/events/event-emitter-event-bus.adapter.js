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
var EventEmitterEventBusAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterEventBusAdapter = void 0;
const common_1 = require("@nestjs/common");
const node_events_1 = require("node:events");
const MAX_LISTENERS = 50;
let EventEmitterEventBusAdapter = EventEmitterEventBusAdapter_1 = class EventEmitterEventBusAdapter {
    logger = new common_1.Logger(EventEmitterEventBusAdapter_1.name);
    emitter = new node_events_1.EventEmitter();
    constructor() {
        this.emitter.setMaxListeners(MAX_LISTENERS);
    }
    publish(event) {
        this.logger.debug(`Publishing event: ${event.name} correlation_id=${event.correlation_id ?? "n/a"}`);
        this.emitter.emit(event.name, event);
    }
    subscribe(eventName, handler) {
        const wrapped = async (event) => {
            try {
                await handler(event);
            }
            catch (err) {
                this.logger.error(`Handler error for ${eventName}: ${err instanceof Error ? err.message : String(err)}`);
                throw err;
            }
        };
        this.emitter.on(eventName, wrapped);
        return () => this.emitter.off(eventName, wrapped);
    }
    waitFor(eventName, correlationId, options) {
        const timeoutMs = options?.timeoutMs ?? 60_000;
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                this.emitter.off(eventName, listener);
                reject(new Error(`Timeout waiting for ${eventName} correlation_id=${correlationId}`));
            }, timeoutMs);
            const listener = (event) => {
                if (event.correlation_id === correlationId
                    || event.payload?.correlation_id === correlationId) {
                    clearTimeout(timeout);
                    this.emitter.off(eventName, listener);
                    resolve(event);
                }
            };
            this.emitter.on(eventName, listener);
        });
    }
};
exports.EventEmitterEventBusAdapter = EventEmitterEventBusAdapter;
exports.EventEmitterEventBusAdapter = EventEmitterEventBusAdapter = EventEmitterEventBusAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EventEmitterEventBusAdapter);
//# sourceMappingURL=event-emitter-event-bus.adapter.js.map