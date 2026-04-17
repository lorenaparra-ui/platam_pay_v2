import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { DeleteSupplierByExternalIdRequest } from './delete-supplier-by-external-id.request';
export declare class DeleteSupplierByExternalIdUseCase {
    private readonly supplier_repository;
    constructor(supplier_repository: SupplierRepository);
    execute(req: DeleteSupplierByExternalIdRequest): Promise<void>;
}
