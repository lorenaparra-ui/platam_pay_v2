import { DomainEvent, new_uuid } from '@platam/shared';

export class PartnerCreatedEvent implements DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly aggregateId: string;

  constructor(
    readonly partner_external_id: string,
    readonly supplier_id: number,
    readonly correlation_id?: string,
  ) {
    this.eventId = new_uuid();
    this.occurredAt = new Date();
    this.aggregateId = partner_external_id;
  }
}
