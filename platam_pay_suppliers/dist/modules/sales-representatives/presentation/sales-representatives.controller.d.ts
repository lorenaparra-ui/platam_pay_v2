import { CreateSalesRepresentativeRequestDto } from '../application/dto/create-sales-representative-request.dto';
import { CreateSalesRepresentativeUseCase } from '../application/use-cases/create-sales-representative.use-case';
import { type SalesRepresentativeRepositoryPort } from '../domain/ports/sales-representative.repository.port';
export declare class SalesRepresentativesController {
    private readonly createSalesRepresentativeUseCase;
    private readonly repository;
    constructor(createSalesRepresentativeUseCase: CreateSalesRepresentativeUseCase, repository: SalesRepresentativeRepositoryPort);
    create(body: CreateSalesRepresentativeRequestDto): Promise<import("../domain/models/sales-representative.model").SalesRepresentative>;
    listByPartner(partnerId: number): Promise<import("../domain/models/sales-representative.model").SalesRepresentative[]>;
}
