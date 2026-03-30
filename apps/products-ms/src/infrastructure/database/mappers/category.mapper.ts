import { CategoryEntity } from '@app/products-data';
import { Category } from '@modules/categories/domain/models/category.models';

export class CategoryMapper {
  static to_domain(row: CategoryEntity): Category {
    return new Category(
      row.id,
      row.externalId,
      row.creditFacilityId,
      row.partnerId ?? null,
      row.name,
      row.discountPercentage,
      row.interestRate,
      row.disbursementFeePercent ?? null,
      row.minimumDisbursementFee ?? null,
      row.delayDays,
      row.termDays,
      row.statusId,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): Category {
    return new Category(
      Number(row['id']),
      String(row['external_id']),
      Number(row['credit_facility_id']),
      row['partner_id'] === null || row['partner_id'] === undefined
        ? null
        : Number(row['partner_id']),
      String(row['name']),
      String(row['discount_percentage']),
      String(row['interest_rate']),
      row['disbursement_fee_percent'] === null ||
      row['disbursement_fee_percent'] === undefined
        ? null
        : String(row['disbursement_fee_percent']),
      row['minimum_disbursement_fee'] === null ||
      row['minimum_disbursement_fee'] === undefined
        ? null
        : String(row['minimum_disbursement_fee']),
      Number(row['delay_days']),
      Number(row['term_days']),
      Number(row['status_id']),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
