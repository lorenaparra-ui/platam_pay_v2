import { TransversalEventType } from './transversal-outbound-event.dto';
export declare class TransversalInboundMessageDto {
    correlation_id: string;
    event_type: TransversalEventType;
    payload: Record<string, unknown>;
    trace_id?: string;
}
