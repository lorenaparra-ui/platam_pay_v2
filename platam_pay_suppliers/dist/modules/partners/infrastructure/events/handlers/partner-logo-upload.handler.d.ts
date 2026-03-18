import { OnModuleInit } from "@nestjs/common";
import { type PartnerLogoUploadRequestedPayload } from "../../../domain/events/partner.events";
import type { PartnerLogoStoragePort } from "../../../domain/ports/partner-logo-storage.port";
import { type DomainEventEnvelope, type EventBusPort } from "../../../domain/ports/event-bus.port";
export declare class PartnerLogoUploadHandler implements OnModuleInit {
    private readonly eventBus;
    private readonly logoStorage;
    private readonly logger;
    constructor(eventBus: EventBusPort, logoStorage: PartnerLogoStoragePort);
    onModuleInit(): void;
    handle(envelope: DomainEventEnvelope<PartnerLogoUploadRequestedPayload>): Promise<void>;
}
