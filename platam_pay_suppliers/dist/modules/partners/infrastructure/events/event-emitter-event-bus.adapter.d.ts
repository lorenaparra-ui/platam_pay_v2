import type { DomainEventEnvelope, EventBusPort } from "../../domain/ports/event-bus.port";
export declare class EventEmitterEventBusAdapter implements EventBusPort {
    private readonly logger;
    private readonly emitter;
    constructor();
    publish<T>(event: DomainEventEnvelope<T>): void;
    subscribe(eventName: string, handler: (event: DomainEventEnvelope) => void | Promise<void>): () => void;
    waitFor<T>(eventName: string, correlationId: string, options?: {
        timeoutMs?: number;
    }): Promise<DomainEventEnvelope<T>>;
}
