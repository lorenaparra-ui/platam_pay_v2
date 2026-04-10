import { DomainEvent } from '@platam/shared';
export declare class PartnerCreatedEvent implements DomainEvent {
    readonly partner_external_id: string;
    readonly supplier_id: number;
    readonly correlation_id?: string | undefined;
    readonly eventId: string;
    readonly occurredAt: Date;
    readonly aggregateId: string;
    constructor(partner_external_id: string, supplier_id: number, correlation_id?: string | undefined);
}
