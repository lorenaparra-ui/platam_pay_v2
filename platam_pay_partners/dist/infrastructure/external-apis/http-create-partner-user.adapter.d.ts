import { ConfigService } from "@nestjs/config";
import type { CreatePartnerUserPort, CreatePartnerUserPayload, CreatePartnerUserResult } from "@partners/domain/ports/create-partner-user.port";
export declare class HttpCreatePartnerUserAdapter implements CreatePartnerUserPort {
    private readonly configService;
    private readonly logger;
    private readonly baseUrl;
    constructor(configService: ConfigService);
    createPartnerUser(payload: CreatePartnerUserPayload): Promise<CreatePartnerUserResult>;
}
