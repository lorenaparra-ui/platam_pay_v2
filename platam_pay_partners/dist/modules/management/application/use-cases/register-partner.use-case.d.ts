import type { CreatePartnerUserPort } from "../../domain/ports/create-partner-user.port";
import type { FileStoragePort } from "../../domain/ports/file-storage.port";
import { CreateBusinessUseCase } from "@businesses/application/use-cases/create-business.use-case";
import { CreatePartnerUseCase } from "./create-partner.use-case";
import type { RegisterPartnerRequestDto } from "../dto/register-partner-request.dto";
import { Partner } from "../../domain/models/partner.model";
export interface RegisterPartnerFiles {
    logo?: {
        buffer: Buffer;
        mimetype: string;
    };
    co_branding_logo?: {
        buffer: Buffer;
        mimetype: string;
    };
}
export declare class RegisterPartnerUseCase {
    private readonly createPartnerUserPort;
    private readonly fileStorage;
    private readonly createBusinessUseCase;
    private readonly createPartnerUseCase;
    private readonly logger;
    constructor(createPartnerUserPort: CreatePartnerUserPort, fileStorage: FileStoragePort, createBusinessUseCase: CreateBusinessUseCase, createPartnerUseCase: CreatePartnerUseCase);
    execute(body: RegisterPartnerRequestDto, files: RegisterPartnerFiles): Promise<Partner>;
    private parseCityId;
    private uploadLogoIfPresent;
    private mapCategories;
}
