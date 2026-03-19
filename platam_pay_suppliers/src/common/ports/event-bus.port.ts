/**
 * Puerto transversal de mensajería interna (pub/sub).
 * Implementaciones viven en infrastructure; los módulos solo inyectan esta interfaz.
 */

export const EVENT_BUS_PORT = "EVENT_BUS_PORT";

export interface DomainEventEnvelope<T = unknown> {
  name: string;
  payload: T;
  occurred_at: string;
  correlation_id?: string;
  message_id?: string;
}

export interface EventBusPort {
  publish<T>(event: DomainEventEnvelope<T>): void | Promise<void>;
  subscribe(
    eventName: string,
    handler: (event: DomainEventEnvelope) => void | Promise<void>,
  ): () => void;
  waitFor?<T>(
    eventName: string,
    correlationId: string,
    options?: { timeoutMs?: number },
  ): Promise<DomainEventEnvelope<T>>;
}
