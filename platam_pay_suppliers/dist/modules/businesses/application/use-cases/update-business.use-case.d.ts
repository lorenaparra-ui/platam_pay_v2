import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';
import { UpdateBusinessRequestDto } from '../dto/update-business-request.dto';
export declare class UpdateBusinessUseCase {
    private readonly repository;
    constructor(repository: BusinessRepositoryPort);
    execute(externalId: string, dto: UpdateBusinessRequestDto): Promise<BusinessResponseDto | null>;
}
