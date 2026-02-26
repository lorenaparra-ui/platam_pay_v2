import { CreatePartnerRequestDto } from "../application/dto/create-partner-request.dto";
import { PartnerResponseDto } from "../application/dto/partner-response.dto";
import { UpdatePartnerRequestDto } from "../application/dto/update-partner-request.dto";
import { type PartnerRepositoryPort } from "../domain/ports/partner.repository.port";
export declare class PartnersController {
    private readonly repository;
    constructor(repository: PartnerRepositoryPort);
    private getCrudRepository;
    create(body: CreatePartnerRequestDto): Promise<PartnerResponseDto>;
    findAll(): Promise<PartnerResponseDto[]>;
    findByExternalId(externalId: string): Promise<PartnerResponseDto>;
    private findByExternalIdHandler;
    updateByExternalId(externalId: string, body: UpdatePartnerRequestDto): Promise<PartnerResponseDto>;
    deleteByExternalId(externalId: string): Promise<void>;
}
