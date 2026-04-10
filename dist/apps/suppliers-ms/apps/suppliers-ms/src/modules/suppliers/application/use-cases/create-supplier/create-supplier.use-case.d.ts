import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { CreateSupplierRequest } from './create-supplier.request';
import { CreateSupplierResponse } from './create-supplier.response';
export declare class CreateSupplierUseCase {
    private readonly supplier_repository;
    private readonly lookup;
    constructor(supplier_repository: SupplierRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: CreateSupplierRequest): Promise<CreateSupplierResponse>;
}
