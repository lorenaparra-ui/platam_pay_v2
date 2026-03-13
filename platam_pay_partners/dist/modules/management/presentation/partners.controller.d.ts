import { ChangePartnerStatusRequestDto } from "../application/dto/change-partner-status-request.dto";
import { CreatePartnerRequestDto } from "../application/dto/create-partner-request.dto";
import { PartnerListQueryDto } from "../application/dto/partner-list-query.dto";
import { PartnerResponseDto } from "../application/dto/partner-response.dto";
import { UpdatePartnerRequestDto } from "../application/dto/update-partner-request.dto";
import { ChangePartnerStatusUseCase } from "../application/use-cases/change-partner-status.use-case";
import { CreatePartnerUseCase } from "../application/use-cases/create-partner.use-case";
import { DeletePartnerByExternalIdUseCase } from "../application/use-cases/delete-partner-by-external-id.use-case";
import { FindAllPartnersUseCase } from "../application/use-cases/find-all-partners.use-case";
import { FindPartnerByExternalIdUseCase } from "../application/use-cases/find-partner-by-external-id.use-case";
import { UpdatePartnerByExternalIdUseCase } from "../application/use-cases/update-partner-by-external-id.use-case";
export declare class PartnersController {
    private readonly createPartnerUseCase;
    private readonly findAllPartnersUseCase;
    private readonly findPartnerByExternalIdUseCase;
    private readonly updatePartnerByExternalIdUseCase;
    private readonly deletePartnerByExternalIdUseCase;
    private readonly changePartnerStatusUseCase;
    constructor(createPartnerUseCase: CreatePartnerUseCase, findAllPartnersUseCase: FindAllPartnersUseCase, findPartnerByExternalIdUseCase: FindPartnerByExternalIdUseCase, updatePartnerByExternalIdUseCase: UpdatePartnerByExternalIdUseCase, deletePartnerByExternalIdUseCase: DeletePartnerByExternalIdUseCase, changePartnerStatusUseCase: ChangePartnerStatusUseCase);
    create(body: CreatePartnerRequestDto): Promise<PartnerResponseDto>;
    findAll(query: PartnerListQueryDto): Promise<PartnerResponseDto[]>;
    findByExternalId(externalId: string): Promise<PartnerResponseDto>;
    private findByExternalIdHandler;
    updateByExternalId(externalId: string, body: UpdatePartnerRequestDto): Promise<PartnerResponseDto>;
    deleteByExternalId(externalId: string): Promise<void>;
    changeStatus(externalId: string, body: ChangePartnerStatusRequestDto): Promise<PartnerResponseDto>;
    private mapCategories;
    private executeWithUniqueConstraintHandling;
}
