import { CreateCreditApplicationBnplUseCase } from "../application/use-cases/create-credit-application-bnpl.use-case";
import { GetCreditApplicationBnplByExternalIdUseCase } from "../application/use-cases/get-credit-application-bnpl-by-external-id.use-case";
import { ListCreditApplicationsBnplUseCase } from "../application/use-cases/list-credit-applications-bnpl.use-case";
import { UpdateCreditApplicationBnplUseCase } from "../application/use-cases/update-credit-application-bnpl.use-case";
import { DeleteCreditApplicationBnplUseCase } from "../application/use-cases/delete-credit-application-bnpl.use-case";
import { CreateCreditApplicationBnplRequestDto } from "../application/dto/create-credit-application-bnpl-request.dto";
import { UpdateCreditApplicationBnplRequestDto } from "../application/dto/update-credit-application-bnpl-request.dto";
import { CreditApplicationBnplResponseDto } from "../application/dto/credit-application-bnpl-response.dto";
export declare class CreditApplicationBnplController {
    private readonly createUseCase;
    private readonly getByExternalIdUseCase;
    private readonly listUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor(createUseCase: CreateCreditApplicationBnplUseCase, getByExternalIdUseCase: GetCreditApplicationBnplByExternalIdUseCase, listUseCase: ListCreditApplicationsBnplUseCase, updateUseCase: UpdateCreditApplicationBnplUseCase, deleteUseCase: DeleteCreditApplicationBnplUseCase);
    create(body: CreateCreditApplicationBnplRequestDto): Promise<CreditApplicationBnplResponseDto>;
    findAll(): Promise<CreditApplicationBnplResponseDto[]>;
    findByExternalId(externalId: string): Promise<CreditApplicationBnplResponseDto>;
    updateByExternalId(externalId: string, body: UpdateCreditApplicationBnplRequestDto): Promise<CreditApplicationBnplResponseDto>;
    deleteByExternalId(externalId: string): Promise<void>;
}
