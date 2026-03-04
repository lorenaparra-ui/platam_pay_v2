import { PartnerCategory } from "@partner-categories/domain/models/partner-category.model";
import { PartnerCategoriesEntity } from "@infrastructure/database/entities/partner-categories.entity";

export class PartnerCategoriesMapper {
  static toDomain(entity: PartnerCategoriesEntity): PartnerCategory {
    return {
      id: entity.id,
      externalId: entity.externalId,
      partnerId: entity.partnerId,
      name: entity.name,
      discountPercentage: entity.discountPercentage,
      interestRate: entity.interestRate,
      disbursementFeePercent: entity.disbursementFeePercent,
      minimumDisbursementFee: entity.minimumDisbursementFee,
      delayDays: entity.delayDays,
      termDays: entity.termDays,
      statusId: entity.statusId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
