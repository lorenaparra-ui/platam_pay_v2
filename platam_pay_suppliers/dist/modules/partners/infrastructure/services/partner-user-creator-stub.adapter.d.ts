import type { PartnerUserCreatorPort } from "../events/handlers/partner-user-create.handler";
export declare class PartnerUserCreatorStubAdapter implements PartnerUserCreatorPort {
    private readonly logger;
    createUser(): Promise<{
        user_id: number;
        external_id: string;
    }>;
}
