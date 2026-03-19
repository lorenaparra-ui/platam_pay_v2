import { CreateCategoryRequestDto } from "../application/dto/create-category-request.dto";
import { UpdateCategoryRequestDto } from "../application/dto/update-category-request.dto";
import { CategoryResponseDto } from "../application/dto/category-response.dto";
import { CreateCategoryUseCase } from "../application/use-cases/create-category.use-case";
import { GetCategoryByExternalIdUseCase } from "../application/use-cases/get-category-by-external-id.use-case";
import { ListCategoriesByCreditFacilityIdUseCase } from "../application/use-cases/list-categories-by-credit-facility-id.use-case";
import { UpdateCategoryUseCase } from "../application/use-cases/update-category.use-case";
import { DeleteCategoryUseCase } from "../application/use-cases/delete-category.use-case";
export declare class CategoriesController {
    private readonly create_uc;
    private readonly get_by_external_uc;
    private readonly list_by_cf_uc;
    private readonly update_uc;
    private readonly delete_uc;
    constructor(create_uc: CreateCategoryUseCase, get_by_external_uc: GetCategoryByExternalIdUseCase, list_by_cf_uc: ListCategoriesByCreditFacilityIdUseCase, update_uc: UpdateCategoryUseCase, delete_uc: DeleteCategoryUseCase);
    create(body: CreateCategoryRequestDto): Promise<CategoryResponseDto>;
    list_by_credit_facility(credit_facility_id: number): Promise<CategoryResponseDto[]>;
    get_one(external_id: string): Promise<CategoryResponseDto>;
    update(external_id: string, body: UpdateCategoryRequestDto): Promise<CategoryResponseDto>;
    remove(external_id: string): Promise<void>;
}
