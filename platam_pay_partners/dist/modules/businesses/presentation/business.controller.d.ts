import { CreateBusinessUseCase } from '../application/use-cases/create-business.use-case';
import { GetBusinessByExternalIdUseCase } from '../application/use-cases/get-business-by-external-id.use-case';
import { ListBusinessesUseCase } from '../application/use-cases/list-businesses.use-case';
import { UpdateBusinessUseCase } from '../application/use-cases/update-business.use-case';
import { DeleteBusinessUseCase } from '../application/use-cases/delete-business.use-case';
import { CreateBusinessRequestDto } from '../application/dto/create-business-request.dto';
import { UpdateBusinessRequestDto } from '../application/dto/update-business-request.dto';
import { BusinessResponseDto } from '../application/dto/business-response.dto';
export declare class BusinessController {
    private readonly createBusinessUseCase;
    private readonly getBusinessByExternalIdUseCase;
    private readonly listBusinessesUseCase;
    private readonly updateBusinessUseCase;
    private readonly deleteBusinessUseCase;
    constructor(createBusinessUseCase: CreateBusinessUseCase, getBusinessByExternalIdUseCase: GetBusinessByExternalIdUseCase, listBusinessesUseCase: ListBusinessesUseCase, updateBusinessUseCase: UpdateBusinessUseCase, deleteBusinessUseCase: DeleteBusinessUseCase);
    create(body: CreateBusinessRequestDto): Promise<BusinessResponseDto>;
    findAll(): Promise<BusinessResponseDto[]>;
    findByExternalId(externalId: string): Promise<BusinessResponseDto>;
    updateByExternalId(externalId: string, body: UpdateBusinessRequestDto): Promise<BusinessResponseDto>;
    deleteByExternalId(externalId: string): Promise<void>;
}
