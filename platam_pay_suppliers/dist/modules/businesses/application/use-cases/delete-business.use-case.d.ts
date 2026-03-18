import type { BusinessRepositoryPort } from '../../domain/ports/business.repository.port';
export declare class DeleteBusinessUseCase {
    private readonly repository;
    constructor(repository: BusinessRepositoryPort);
    execute(externalId: string): Promise<boolean>;
}
