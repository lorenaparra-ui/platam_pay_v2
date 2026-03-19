import type { Category } from "../../../modules/categories/domain/models/category.model";
import { CategoryEntity } from "@libs/database";

export class CategoryMapper {
  static to_domain(entity: CategoryEntity): Category {
    return {
      id: Number(entity.id),
      external_id: entity.externalId,
      credit_facility_id: Number(entity.creditFacilityId),
      partner_id:
        entity.partnerId != null ? Number(entity.partnerId) : null,
      name: entity.name,
      discount_percentage: String(entity.discountPercentage),
      interest_rate: String(entity.interestRate),
      disbursement_fee_percent:
        entity.disbursementFeePercent != null
          ? String(entity.disbursementFeePercent)
          : null,
      minimum_disbursement_fee:
        entity.minimumDisbursementFee != null
          ? String(entity.minimumDisbursementFee)
          : null,
      delay_days: entity.delayDays,
      term_days: entity.termDays,
      status_id: Number(entity.statusId),
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}
