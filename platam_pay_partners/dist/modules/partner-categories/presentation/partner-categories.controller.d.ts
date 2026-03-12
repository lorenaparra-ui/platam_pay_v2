import { CreatePartnerCategoryRequestDto } from "../application/dto/create-partner-category-request.dto";
import { PartnerCategoryListQueryDto } from "../application/dto/partner-category-list-query.dto";
import { FindCategoriesByPartnerUseCase } from "../application/use-cases/find-categories-by-partner.use-case";
import { CreatePartnerCategoryUseCase } from "../application/use-cases/create-partner-category.use-case";
import { FindAllPartnerCategoriesUseCase } from "../application/use-cases/find-all-partner-categories.use-case";
import { FindPartnerCategoryByExternalIdUseCase } from "../application/use-cases/find-partner-category-by-external-id.use-case";
import { UpdatePartnerCategoryByExternalIdUseCase } from "../application/use-cases/update-partner-category-by-external-id.use-case";
import { DeletePartnerCategoryByExternalIdUseCase } from "../application/use-cases/delete-partner-category-by-external-id.use-case";
import { UpdatePartnerCategoryRequestDto } from "../application/dto/update-partner-category-request.dto";
import { PartnerCategoryResponseDto } from "../application/dto/partner-category-response.dto";
export declare class PartnerCategoriesController {
    private readonly createPartnerCategoryUseCase;
    private readonly findAllPartnerCategoriesUseCase;
    private readonly findPartnerCategoryByExternalIdUseCase;
    private readonly updatePartnerCategoryByExternalIdUseCase;
    private readonly deletePartnerCategoryByExternalIdUseCase;
    private readonly findCategoriesByPartnerUseCase;
    constructor(createPartnerCategoryUseCase: CreatePartnerCategoryUseCase, findAllPartnerCategoriesUseCase: FindAllPartnerCategoriesUseCase, findPartnerCategoryByExternalIdUseCase: FindPartnerCategoryByExternalIdUseCase, updatePartnerCategoryByExternalIdUseCase: UpdatePartnerCategoryByExternalIdUseCase, deletePartnerCategoryByExternalIdUseCase: DeletePartnerCategoryByExternalIdUseCase, findCategoriesByPartnerUseCase: FindCategoriesByPartnerUseCase);
    create(body: CreatePartnerCategoryRequestDto): Promise<PartnerCategoryResponseDto>;
    findAll(query: PartnerCategoryListQueryDto): Promise<PartnerCategoryResponseDto[]>;
    findByExternalId(externalId: string): Promise<PartnerCategoryResponseDto>;
    updateByExternalId(externalId: string, body: UpdatePartnerCategoryRequestDto): Promise<PartnerCategoryResponseDto>;
    deleteByExternalId(externalId: string): Promise<void>;
    findByPartner(partnerExternalId: string): Promise<PartnerCategoryResponseDto[]>;
    private executeWithConstraintHandling;
}
