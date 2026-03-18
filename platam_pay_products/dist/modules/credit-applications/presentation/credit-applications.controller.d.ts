import { CreateCreditApplicationRequestDto } from "../application/dto/create-credit-application-request.dto";
import { CreditApplicationResponseDto } from "../application/dto/credit-application-response.dto";
import { UpdateCreditApplicationRequestDto } from "../application/dto/update-credit-application-request.dto";
import { CreateCreditApplicationUseCase } from "../application/use-cases/create-credit-application.use-case";
import { DeleteCreditApplicationUseCase } from "../application/use-cases/delete-credit-application.use-case";
import { GetAllCreditApplicationsUseCase } from "../application/use-cases/get-all-credit-applications.use-case";
import { GetCreditApplicationByExternalIdUseCase } from "../application/use-cases/get-credit-application-by-external-id.use-case";
import { UpdateCreditApplicationUseCase } from "../application/use-cases/update-credit-application.use-case";
export declare class CreditApplicationsController {
    private readonly createUseCase;
    private readonly getAllUseCase;
    private readonly getByExternalIdUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor(createUseCase: CreateCreditApplicationUseCase, getAllUseCase: GetAllCreditApplicationsUseCase, getByExternalIdUseCase: GetCreditApplicationByExternalIdUseCase, updateUseCase: UpdateCreditApplicationUseCase, deleteUseCase: DeleteCreditApplicationUseCase);
    create(body: CreateCreditApplicationRequestDto): Promise<CreditApplicationResponseDto>;
    findAll(): Promise<CreditApplicationResponseDto[]>;
    findByExternalId(externalId: string): Promise<CreditApplicationResponseDto>;
    updateByExternalId(externalId: string, body: UpdateCreditApplicationRequestDto): Promise<CreditApplicationResponseDto>;
    deleteByExternalId(externalId: string): Promise<void>;
}
