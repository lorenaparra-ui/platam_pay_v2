"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerCategoriesMapper = void 0;
class PartnerCategoriesMapper {
    static toDomain(entity) {
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
exports.PartnerCategoriesMapper = PartnerCategoriesMapper;
//# sourceMappingURL=partner-categories.mapper.js.map