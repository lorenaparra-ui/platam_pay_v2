import type { PartnerUserCreatorPort } from "@partners/application/ports/partner-user-creator.port";
export declare class PartnerUserCreatorStubAdapter implements PartnerUserCreatorPort {
    private readonly logger;
    createUser(): Promise<{
        user_id: number;
        external_id: string;
    }>;
}
