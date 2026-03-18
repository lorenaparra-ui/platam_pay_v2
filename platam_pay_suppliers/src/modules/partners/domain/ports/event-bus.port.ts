/**
 * Puerto de dominio para publicación y suscripción a eventos (simulación SQS / cola interna).
 * Permite desacoplar use cases de handlers y preparar migración a mensajería real.
 */

export const EVENT_BUS_PORT = "EVENT_BUS_PORT";

export interface DomainEventEnvelope<T = unknown> {
  name: string;
  payload: T;
  occurred_at: string; // ISO 8601
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
