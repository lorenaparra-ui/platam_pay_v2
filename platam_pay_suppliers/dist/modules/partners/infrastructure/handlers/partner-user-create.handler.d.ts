import { OnModuleInit } from "@nestjs/common";
import { type PartnerUserCreateRequestedPayload } from "../../domain/events/partner.events";
import { type DomainEventEnvelope, type EventBusPort } from "@common/ports/event-bus.port";
import { type PartnerUserCreatorPort } from "../../application/ports/partner-user-creator.port";
export declare class PartnerUserCreateHandler implements OnModuleInit {
    private readonly eventBus;
    private readonly userCreator;
    private readonly logger;
    constructor(eventBus: EventBusPort, userCreator: PartnerUserCreatorPort);
    onModuleInit(): void;
    handle(envelope: DomainEventEnvelope<PartnerUserCreateRequestedPayload>): Promise<void>;
}
