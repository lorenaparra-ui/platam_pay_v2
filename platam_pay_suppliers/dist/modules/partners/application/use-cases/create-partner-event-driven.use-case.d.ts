import type { BusinessRepositoryPort } from "@businesses/domain/ports/business.repository.port";
import type { PartnerRepositoryPort } from "@partners/domain/ports/partner.repository.port";
import type { EventBusPort } from "@common/ports/event-bus.port";
import { Partner } from "@partners/domain/models/partner.model";
import type { CreatePartnerFullRequestDto } from "../dto/create-partner-full-request.dto";
export declare class CreatePartnerEventDrivenUseCase {
    private readonly businessRepository;
    private readonly partnerRepository;
    private readonly eventBus;
    private readonly logger;
    constructor(businessRepository: BusinessRepositoryPort, partnerRepository: PartnerRepositoryPort, eventBus: EventBusPort);
    execute(dto: CreatePartnerFullRequestDto, files: {
        logo: {
            buffer: Buffer;
            mimetype: string;
            originalname: string;
        };
        coBrandingLogo: {
            buffer: Buffer;
            mimetype: string;
            originalname: string;
        };
    }): Promise<Partner>;
}
