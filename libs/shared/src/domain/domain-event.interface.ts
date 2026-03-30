/**
 * Contrato mínimo para eventos de dominio (sin conocimiento de transporte ni SQS).
 */
export interface DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly aggregateId: string;
}
