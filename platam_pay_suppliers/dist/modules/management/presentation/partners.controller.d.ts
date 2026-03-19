import { ChangePartnerStatusRequestDto } from "@partners/application/dto/change-partner-status-request.dto";
import { CreatePartnerRequestDto } from "@partners/application/dto/create-partner-request.dto";
import { PartnerListQueryDto } from "@partners/application/dto/partner-list-query.dto";
import { PartnerResponseDto } from "@partners/application/dto/partner-response.dto";
import { UpdatePartnerRequestDto } from "@partners/application/dto/update-partner-request.dto";
import { ChangePartnerStatusUseCase } from "@partners/application/use-cases/change-partner-status.use-case";
import { CreatePartnerUseCase } from "@partners/application/use-cases/create-partner.use-case";
import { CreatePartnerEventDrivenUseCase } from "@partners/application/use-cases/create-partner-event-driven.use-case";
import { DeletePartnerByExternalIdUseCase } from "@partners/application/use-cases/delete-partner-by-external-id.use-case";
import { FindAllPartnersUseCase } from "@partners/application/use-cases/find-all-partners.use-case";
import { FindPartnerByExternalIdUseCase } from "@partners/application/use-cases/find-partner-by-external-id.use-case";
import { UpdatePartnerByExternalIdUseCase } from "@partners/application/use-cases/update-partner-by-external-id.use-case";
export declare class PartnersController {
    private readonly createPartnerUseCase;
    private readonly createPartnerEventDrivenUseCase;
    private readonly findAllPartnersUseCase;
    private readonly findPartnerByExternalIdUseCase;
    private readonly updatePartnerByExternalIdUseCase;
    private readonly deletePartnerByExternalIdUseCase;
    private readonly changePartnerStatusUseCase;
    private readonly logger;
    constructor(createPartnerUseCase: CreatePartnerUseCase, createPartnerEventDrivenUseCase: CreatePartnerEventDrivenUseCase, findAllPartnersUseCase: FindAllPartnersUseCase, findPartnerByExternalIdUseCase: FindPartnerByExternalIdUseCase, updatePartnerByExternalIdUseCase: UpdatePartnerByExternalIdUseCase, deletePartnerByExternalIdUseCase: DeletePartnerByExternalIdUseCase, changePartnerStatusUseCase: ChangePartnerStatusUseCase);
    createFull(dataJson: string, files: {
        logo?: Array<{
            buffer: Buffer;
            mimetype: string;
            originalname: string;
        }>;
        coBrandingLogo?: Array<{
            buffer: Buffer;
            mimetype: string;
            originalname: string;
        }>;
    }): Promise<PartnerResponseDto>;
    create(body: CreatePartnerRequestDto): Promise<PartnerResponseDto>;
    findAll(query: PartnerListQueryDto): Promise<PartnerResponseDto[]>;
    findByExternalId(externalId: string): Promise<PartnerResponseDto>;
    updateByExternalId(externalId: string, body: UpdatePartnerRequestDto): Promise<PartnerResponseDto>;
    deleteByExternalId(externalId: string): Promise<void>;
    changeStatus(externalId: string, body: ChangePartnerStatusRequestDto): Promise<PartnerResponseDto>;
    private runWithConstraintHandling;
}
