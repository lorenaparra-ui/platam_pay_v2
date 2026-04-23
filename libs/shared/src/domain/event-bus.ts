import { DomainEvent } from './domain-event.interface';

export type DomainEventHandler<T extends DomainEvent = DomainEvent> = (
  event: T,
) => Promise<void> | void;

/**
 * Bus de eventos de dominio en memoria.
 * Desacopla efectos secundarios (auditoría, notificaciones, integraciones) de los use-cases.
 *
 * Uso:
 *  - Registrar handlers via subscribe() en el módulo o service de arranque.
 *  - Publicar eventos via publish() desde use-cases o entidades de dominio.
 *  - Los errores de handlers individuales se capturan sin bloquear los demás.
 */
export class DomainEventBus {
  private readonly handlers = new Map<string, DomainEventHandler[]>();

  subscribe<T extends DomainEvent>(event_name: string, handler: DomainEventHandler<T>): void {
    if (!this.handlers.has(event_name)) {
      this.handlers.set(event_name, []);
    }
    this.handlers.get(event_name)!.push(handler as DomainEventHandler);
  }

  async publish(event: DomainEvent): Promise<void> {
    const event_name = event.constructor.name;
    const fns = this.handlers.get(event_name) ?? [];
    await Promise.allSettled(fns.map((fn) => fn(event)));
  }

  async publish_many(events: DomainEvent[]): Promise<void> {
    await Promise.allSettled(events.map((e) => this.publish(e)));
  }
}

export const DOMAIN_EVENT_BUS = Symbol('DOMAIN_EVENT_BUS');
