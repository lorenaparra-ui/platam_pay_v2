import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SUPPLIER_REPOSITORY } from '@modules/suppliers/suppliers.tokens';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { DeleteSupplierByExternalIdRequest } from './delete-supplier-by-external-id.request';

@Injectable()
export class DeleteSupplierByExternalIdUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplier_repository: SupplierRepository,
  ) {}

  async execute(req: DeleteSupplierByExternalIdRequest): Promise<void> {
    const ok = await this.supplier_repository.delete_by_external_id(
      req.external_id,
    );
    if (!ok) {
      throw new NotFoundException('supplier not found');
    }
  }
}
