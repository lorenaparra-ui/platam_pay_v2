import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    const business_id =
      await this.lookup.get_business_internal_id_by_external_id(
        req.business_external_id,
      );
    if (business_id === null) {
      throw new NotFoundException('business not found');
    }

    const created = await this.supplier_repository.create({
      business_id,
      new_bank_account: req.new_bank_account,
    });

    const fields = await build_supplier_public_fields(created, this.lookup);
    return new CreateSupplierResponse(fields);
  }
}
