import { Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { SUPPLIER_REPOSITORY } from '@modules/suppliers/suppliers.tokens';
import { SupplierRepository } from '@modules/suppliers/domain/repositories/supplier.repository';
import { build_supplier_public_fields } from '@modules/suppliers/application/mapping/supplier-public-fields.builder';
import { ListSuppliersItemResponse } from './list-suppliers.response';

@Injectable()
export class ListSuppliersUseCase {
  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    private readonly supplier_repository: SupplierRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(): Promise<ListSuppliersItemResponse[]> {
    const rows = await this.supplier_repository.find_all();
    const out: ListSuppliersItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_supplier_public_fields(row, this.lookup);
      out.push(new ListSuppliersItemResponse(fields));
    }
    return out;
  }
}
