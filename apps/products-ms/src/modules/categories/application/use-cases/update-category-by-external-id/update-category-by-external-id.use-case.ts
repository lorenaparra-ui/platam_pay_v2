import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import {
  PRODUCTS_REFERENCE_LOOKUP,
  type ProductsReferenceLookupPort,
} from '@common/ports/products-reference-lookup.port';
import { CategoryRepository } from '@modules/categories/domain/ports/category.ports';
import { UpdateCategoryProps } from '@modules/categories/domain/models/category.models';
import { build_category_public_fields } from '@modules/categories/application/mapping/category-public-fields.builder';
import { UpdateCategoryByExternalIdRequest } from './update-category-by-external-id.request';
import { UpdateCategoryByExternalIdResponse } from './update-category-by-external-id.response';

@Injectable()
export class UpdateCategoryByExternalIdUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly category_repository: CategoryRepository,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly reference_lookup: ProductsReferenceLookupPort,
  ) {}

  async execute(
    req: UpdateCategoryByExternalIdRequest,
  ): Promise<UpdateCategoryByExternalIdResponse> {
    const patch: UpdateCategoryProps = {};

    if (req.credit_facility_external_id !== undefined) {
      const id =
        await this.reference_lookup.get_credit_facility_internal_id_by_external_id(
          req.credit_facility_external_id,
        );
      if (id === null) {
        throw new NotFoundException('credit facility not found');
      }
      patch.credit_facility_id = id;
    }

    if (req.partner_id !== undefined) {
      patch.partner_id = req.partner_id;
    }

    if (req.name !== undefined) {
      patch.name = req.name;
    }
    if (req.discount_percentage !== undefined) {
      patch.discount_percentage = req.discount_percentage;
    }
    if (req.interest_rate !== undefined) {
      patch.interest_rate = req.interest_rate;
    }
    if (req.disbursement_fee_percent !== undefined) {
      patch.disbursement_fee_percent = req.disbursement_fee_percent;
    }
    if (req.minimum_disbursement_fee !== undefined) {
      patch.minimum_disbursement_fee = req.minimum_disbursement_fee;
    }
    if (req.delay_days !== undefined) {
      patch.delay_days = req.delay_days;
    }
    if (req.term_days !== undefined) {
      patch.term_days = req.term_days;
    }
    if (req.status_external_id !== undefined) {
      const s_id =
        await this.reference_lookup.get_status_internal_id_by_external_id(
          req.status_external_id,
        );
      if (s_id === null) {
        throw new NotFoundException('status not found');
      }
      patch.status_id = s_id;
    }

    const updated = await this.category_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('category not found');
    }

    const fields = await build_category_public_fields(updated, this.reference_lookup);
    return new UpdateCategoryByExternalIdResponse(fields);
  }
}
