import { DomainEvent } from './domain-event.interface';
export type DomainEventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<void> | void;
export declare class DomainEventBus {
    private readonly handlers;
    subscribe<T extends DomainEvent>(event_name: string, handler: DomainEventHandler<T>): void;
    publish(event: DomainEvent): Promise<void>;
    publish_many(events: DomainEvent[]): Promise<void>;
}
export declare const DOMAIN_EVENT_BUS: unique symbol;
