import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';
import { BusinessResponseDto } from '../dto/business-response.dto';
export declare class ListBusinessesUseCase {
    private readonly repository;
    constructor(repository: BusinessRepositoryPort);
    execute(): Promise<BusinessResponseDto[]>;
}
