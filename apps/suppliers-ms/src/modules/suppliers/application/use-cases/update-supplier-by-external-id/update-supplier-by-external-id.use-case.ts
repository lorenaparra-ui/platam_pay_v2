import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { SUPPLIER_REPOSITORY } from '@modules/suppliers/suppliers.tokens';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { build_supplier_public_fields } from '@modules/suppliers/application/mapping/supplier-public-fields.builder';
import { UpdateSupplierByExternalIdRequest } from './update-supplier-by-external-id.request';
import { UpdateSupplierByExternalIdResponse } from './update-supplier-by-external-id.response';
import { UpdateSupplierProps } from '@modules/suppliers/domain/entities/supplier.entity';

@Injectable()
export class UpdateSupplierByExternalIdUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplier_repository: SupplierRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: UpdateSupplierByExternalIdRequest,
  ): Promise<UpdateSupplierByExternalIdResponse> {
    const patch: UpdateSupplierProps = {};

    if (req.bank_account_external_id !== undefined) {
      if (req.bank_account_external_id === null) {
        patch.bank_account_id = null;
      } else {
        const id = await this.lookup.get_bank_account_internal_id_by_external_id(
          req.bank_account_external_id,
        );
        if (id === null) {
          throw new NotFoundException('bank account not found');
        }
        patch.bank_account_id = id;
      }
    }

    const updated = await this.supplier_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('supplier not found');
    }

    const fields = await build_supplier_public_fields(updated, this.lookup);
    return new UpdateSupplierByExternalIdResponse(fields);
  }
}
