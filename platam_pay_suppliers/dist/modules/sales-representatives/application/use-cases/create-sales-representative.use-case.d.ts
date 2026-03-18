import { SalesRepresentative } from '../../domain/models/sales-representative.model';
import { type SalesRepresentativeRepositoryPort } from '../../domain/ports/sales-representative.repository.port';
import type { CreateSalesRepresentativeRequestDto } from '../dto/create-sales-representative-request.dto';
export declare class CreateSalesRepresentativeUseCase {
    private readonly repository;
    constructor(repository: SalesRepresentativeRepositoryPort);
    execute(dto: CreateSalesRepresentativeRequestDto): Promise<SalesRepresentative>;
}
