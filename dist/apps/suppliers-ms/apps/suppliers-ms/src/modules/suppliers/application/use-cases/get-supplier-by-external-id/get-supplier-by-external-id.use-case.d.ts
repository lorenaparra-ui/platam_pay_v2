import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { GetSupplierByExternalIdRequest } from './get-supplier-by-external-id.request';
import { GetSupplierByExternalIdResponse } from './get-supplier-by-external-id.response';
export declare class GetSupplierByExternalIdUseCase {
    private readonly supplier_repository;
    private readonly lookup;
    constructor(supplier_repository: SupplierRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: GetSupplierByExternalIdRequest): Promise<GetSupplierByExternalIdResponse>;
}
