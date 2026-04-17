import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { UpdateSupplierByExternalIdRequest } from './update-supplier-by-external-id.request';
import { UpdateSupplierByExternalIdResponse } from './update-supplier-by-external-id.response';
export declare class UpdateSupplierByExternalIdUseCase {
    private readonly supplier_repository;
    private readonly lookup;
    constructor(supplier_repository: SupplierRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: UpdateSupplierByExternalIdRequest): Promise<UpdateSupplierByExternalIdResponse>;
}
