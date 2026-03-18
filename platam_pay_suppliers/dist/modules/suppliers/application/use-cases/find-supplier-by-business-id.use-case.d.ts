import type { SupplierRepositoryPort } from "../../domain/ports/supplier.repository.port";
import { Supplier } from "../../domain/models/supplier.model";
export declare class FindSupplierByBusinessIdUseCase {
    private readonly repository;
    constructor(repository: SupplierRepositoryPort);
    execute(businessId: number): Promise<Supplier | null>;
}
