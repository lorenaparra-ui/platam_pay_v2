import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import {
  PRODUCTS_REFERENCE_LOOKUP,
  type ProductsReferenceLookupPort,
} from '@common/ports/products-reference-lookup.port';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import { build_category_public_fields } from '@modules/categories/application/mapping/category-public-fields.builder';
import { GetCategoryByExternalIdRequest } from './get-category-by-external-id.request';
import { GetCategoryByExternalIdResponse } from './get-category-by-external-id.response';

@Injectable()
export class GetCategoryByExternalIdUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly category_repository: CategoryRepository,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly reference_lookup: ProductsReferenceLookupPort,
  ) {}

  async execute(
    req: GetCategoryByExternalIdRequest,
  ): Promise<GetCategoryByExternalIdResponse> {
    const row = await this.category_repository.find_by_external_id(
      req.external_id,
    );
    if (row === null) {
      throw new NotFoundException('category not found');
    }
    const fields = await build_category_public_fields(row, this.reference_lookup);
    return new GetCategoryByExternalIdResponse(fields);
  }
}
