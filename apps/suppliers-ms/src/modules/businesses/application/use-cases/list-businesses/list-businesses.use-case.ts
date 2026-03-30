import { Inject, Injectable } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { BUSINESS_REPOSITORY } from '@modules/businesses/businesses.tokens';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { build_business_public_fields } from '@modules/businesses/application/mapping/business-public-fields.builder';
import { ListBusinessesItemResponse } from './list-businesses.response';

@Injectable()
export class ListBusinessesUseCase {
  constructor(
    @Inject(BUSINESS_REPOSITORY)
    private readonly business_repository: BusinessRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(): Promise<ListBusinessesItemResponse[]> {
    const rows = await this.business_repository.find_all();
    const out: ListBusinessesItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_business_public_fields(row, this.lookup);
      out.push(new ListBusinessesItemResponse(fields));
    }
    return out;
  }
}
