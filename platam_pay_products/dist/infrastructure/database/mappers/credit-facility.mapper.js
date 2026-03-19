"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditFacilityMapper = void 0;
class CreditFacilityMapper {
    static to_domain(entity) {
        return {
            id: Number(entity.id),
            external_id: entity.externalId,
            contract_id: entity.contractId ?? null,
            status_id: Number(entity.statusId),
            total_limit: String(entity.totalLimit),
            created_at: entity.createdAt,
            updated_at: entity.updatedAt,
        };
    }
}
exports.CreditFacilityMapper = CreditFacilityMapper;
//# sourceMappingURL=credit-facility.mapper.js.map