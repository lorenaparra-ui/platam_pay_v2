import { OnModuleInit } from "@nestjs/common";
import { type PartnerUserCreateRequestedPayload } from "../../../domain/events/partner.events";
import { type DomainEventEnvelope, type EventBusPort } from "../../../domain/ports/event-bus.port";
export declare const PARTNER_USER_CREATOR = "PARTNER_USER_CREATOR";
export interface PartnerUserCreatorPort {
    createUser(payload: {
        first_name: string;
        last_name: string;
        document_type: string;
        document_number: string;
        email: string;
        phone?: string;
        business_id: number;
        partner_external_id: string;
    }): Promise<{
        user_id: number;
        external_id: string;
    }>;
}
export declare class PartnerUserCreateHandler implements OnModuleInit {
    private readonly eventBus;
    private readonly userCreator;
    private readonly logger;
    constructor(eventBus: EventBusPort, userCreator: PartnerUserCreatorPort);
    onModuleInit(): void;
    handle(envelope: DomainEventEnvelope<PartnerUserCreateRequestedPayload>): Promise<void>;
}
