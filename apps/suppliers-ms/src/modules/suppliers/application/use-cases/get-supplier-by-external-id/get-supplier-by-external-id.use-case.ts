import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { SUPPLIER_REPOSITORY } from '@modules/suppliers/suppliers.tokens';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { build_supplier_public_fields } from '@modules/suppliers/application/mapping/supplier-public-fields.builder';
import { GetSupplierByExternalIdRequest } from './get-supplier-by-external-id.request';
import { GetSupplierByExternalIdResponse } from './get-supplier-by-external-id.response';

@Injectable()
export class GetSupplierByExternalIdUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplier_repository: SupplierRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: GetSupplierByExternalIdRequest,
  ): Promise<GetSupplierByExternalIdResponse> {
    const row = await this.supplier_repository.find_by_external_id(
      req.external_id,
    );
    if (row === null) {
      throw new NotFoundException('supplier not found');
    }
    const fields = await build_supplier_public_fields(row, this.lookup);
    return new GetSupplierByExternalIdResponse(fields);
  }
}
