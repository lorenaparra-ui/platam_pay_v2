import { OnModuleInit } from "@nestjs/common";
import { type PartnerCategoriesCreateRequestedPayload } from "../../domain/events/partner.events";
import { type DomainEventEnvelope, type EventBusPort } from "@common/ports/event-bus.port";
import { type PartnerCategoriesServicePort } from "../../application/ports/partner-categories-service.port";
export declare class PartnerCategoriesCreateHandler implements OnModuleInit {
    private readonly eventBus;
    private readonly categoriesService;
    private readonly logger;
    constructor(eventBus: EventBusPort, categoriesService: PartnerCategoriesServicePort);
    onModuleInit(): void;
    handle(envelope: DomainEventEnvelope<PartnerCategoriesCreateRequestedPayload>): Promise<void>;
}
