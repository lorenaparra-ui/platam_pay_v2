import { Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { SUPPLIER_REPOSITORY } from '@modules/suppliers/suppliers.tokens';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { build_supplier_public_fields } from '@modules/suppliers/application/mapping/supplier-public-fields.builder';
import { CreateSupplierRequest } from './create-supplier.request';
import { CreateSupplierResponse } from './create-supplier.response';

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplier_repository: SupplierRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(req: CreateSupplierRequest): Promise<CreateSupplierResponse> {
    const created = await this.supplier_repository.create({
      business_id: req.business_internal_id,
      bank_account_id: req.bank_account_internal_id,
    });

    const fields = await build_supplier_public_fields(created, this.lookup);
    return new CreateSupplierResponse(fields);
  }
}
