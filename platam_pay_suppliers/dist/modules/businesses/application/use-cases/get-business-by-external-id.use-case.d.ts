import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';
export declare class GetBusinessByExternalIdUseCase {
    private readonly repository;
    constructor(repository: BusinessRepositoryPort);
    execute(externalId: string): Promise<BusinessResponseDto | null>;
}
