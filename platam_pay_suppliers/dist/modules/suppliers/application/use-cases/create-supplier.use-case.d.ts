import type { CreateSupplierPayload, SupplierRepositoryPort } from "../../domain/ports/supplier.repository.port";
import { Supplier } from "../../domain/models/supplier.model";
export declare class CreateSupplierUseCase {
    private readonly repository;
    constructor(repository: SupplierRepositoryPort);
    execute(payload: CreateSupplierPayload): Promise<Supplier>;
}
