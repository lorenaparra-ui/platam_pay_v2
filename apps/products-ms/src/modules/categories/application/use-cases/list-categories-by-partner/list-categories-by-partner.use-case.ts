import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import {
  PRODUCTS_REFERENCE_LOOKUP,
  type ProductsReferenceLookupPort,
} from '@common/ports/products-reference-lookup.port';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import { build_category_public_fields } from '@modules/categories/application/mapping/category-public-fields.builder';
import { ListCategoriesByPartnerRequest } from './list-categories-by-partner.request';
import { ListCategoriesByPartnerItemResponse } from './list-categories-by-partner.response';

@Injectable()
export class ListCategoriesByPartnerUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly category_repository: CategoryRepository,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly reference_lookup: ProductsReferenceLookupPort,
  ) {}

  async execute(
    req: ListCategoriesByPartnerRequest,
  ): Promise<ListCategoriesByPartnerItemResponse[]> {
    const rows = await this.category_repository.find_all({
      partner_id: req.partner_id,
    });

    const out: ListCategoriesByPartnerItemResponse[] = [];
    for (const row of rows) {
      const fields = await build_category_public_fields(row, this.reference_lookup);
      out.push(new ListCategoriesByPartnerItemResponse(fields));
    }
    return out;
  }
}
