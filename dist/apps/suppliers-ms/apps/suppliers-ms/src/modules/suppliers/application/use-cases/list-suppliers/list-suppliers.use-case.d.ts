import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { ListSuppliersItemResponse } from './list-suppliers.response';
export declare class ListSuppliersUseCase {
    private readonly supplier_repository;
    private readonly lookup;
    constructor(supplier_repository: SupplierRepository, lookup: SuppliersReferenceLookupPort);
    execute(): Promise<ListSuppliersItemResponse[]>;
}
