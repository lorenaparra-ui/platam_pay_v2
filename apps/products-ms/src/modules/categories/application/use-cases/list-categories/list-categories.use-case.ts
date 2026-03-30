import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import {
  PRODUCTS_REFERENCE_LOOKUP,
  type ProductsReferenceLookupPort,
} from '@common/ports/products-reference-lookup.port';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import { build_category_public_fields } from '@modules/categories/application/mapping/category-public-fields.builder';
import { ListCategoriesRequest } from './list-categories.request';
import { ListCategoriesItemResponse } from './list-categories.response';

@Injectable()
export class ListCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly category_repository: CategoryRepository,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly reference_lookup: ProductsReferenceLookupPort,
  ) {}

  async execute(
    req: ListCategoriesRequest,
  ): Promise<ListCategoriesItemResponse[]> {
    let credit_facility_id: number | undefined;
    if (req.credit_facility_external_id !== undefined) {
      const id =
        await this.reference_lookup.get_credit_facility_internal_id_by_external_id(
          req.credit_facility_external_id,
        );
      if (id === null) {
        throw new NotFoundException('credit facility not found');
      }
      credit_facility_id = id;
    }

    const rows = await this.category_repository.find_all(
      credit_facility_id !== undefined ? { credit_facility_id } : undefined,
    );

    const out: ListCategoriesItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_category_public_fields(row, this.reference_lookup);
      out.push(new ListCategoriesItemResponse(fields));
    }
    return out;
  }
}
