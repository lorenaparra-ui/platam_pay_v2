import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import {
  PRODUCTS_REFERENCE_LOOKUP,
  type ProductsReferenceLookupPort,
} from '@common/ports/products-reference-lookup.port';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import { build_category_public_fields } from '@modules/categories/application/mapping/category-public-fields.builder';
import { CreateCategoryRequest } from './create-category.request';
import { CreateCategoryResponse } from './create-category.response';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly category_repository: CategoryRepository,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly reference_lookup: ProductsReferenceLookupPort,
  ) {}

  async execute(req: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const credit_facility_id =
      await this.reference_lookup.get_credit_facility_internal_id_by_external_id(
        req.credit_facility_external_id,
      );
    if (credit_facility_id === null) {
      throw new NotFoundException('credit facility not found');
    }

    const partner_id = req.partner_id;

    const created = await this.category_repository.create({
      credit_facility_id,
      partner_id,
      name: req.name,
      discount_percentage: req.discount_percentage,
      interest_rate: req.interest_rate,
      disbursement_fee_percent: req.disbursement_fee_percent,
      minimum_disbursement_fee: req.minimum_disbursement_fee,
      delay_days: req.delay_days,
      term_days: req.term_days,
      state: req.state,
    });

    const fields = await build_category_public_fields(created, this.reference_lookup);
    return new CreateCategoryResponse(fields);
  }
}
