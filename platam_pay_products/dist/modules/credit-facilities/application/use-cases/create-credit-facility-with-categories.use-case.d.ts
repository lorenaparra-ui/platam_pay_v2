import { CreateCreditFacilityUseCase } from "./create-credit-facility.use-case";
import { CreateCategoriesBulkUseCase } from "../../../categories/application/use-cases/create-categories-bulk.use-case";
import type { CreateCreditFacilityWithCategoriesInput } from "../dto/create-credit-facility-with-categories.dto";
import type { CreateCreditFacilityWithCategoriesResult } from "../models/create-credit-facility-with-categories.result";
export declare class CreateCreditFacilityWithCategoriesUseCase {
    private readonly create_facility;
    private readonly create_categories_bulk;
    constructor(create_facility: CreateCreditFacilityUseCase, create_categories_bulk: CreateCategoriesBulkUseCase);
    run(input: CreateCreditFacilityWithCategoriesInput): Promise<CreateCreditFacilityWithCategoriesResult>;
}
