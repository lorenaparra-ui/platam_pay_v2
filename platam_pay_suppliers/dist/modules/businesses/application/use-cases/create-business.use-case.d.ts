import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';
import { CreateBusinessRequestDto } from '../dto/create-business-request.dto';
export declare class CreateBusinessUseCase {
    private readonly repository;
    constructor(repository: BusinessRepositoryPort);
    execute(dto: CreateBusinessRequestDto): Promise<BusinessResponseDto>;
}
