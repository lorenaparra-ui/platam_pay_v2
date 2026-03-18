"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditFacilityMapper = void 0;
const category_mapper_1 = require("./category.mapper");
class CreditFacilityMapper {
    static to_domain(entity) {
        const categories = (entity.categories ?? []).map((c) => category_mapper_1.CategoryMapper.to_domain(c));
        return {
            id: Number(entity.id),
            external_id: entity.externalId,
            contract_id: entity.contractId ?? null,
            status_id: Number(entity.statusId),
            total_limit: String(entity.totalLimit),
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
            categories,
        };
    }
}
exports.CreditFacilityMapper = CreditFacilityMapper;
//# sourceMappingURL=credit-facility.mapper.js.map