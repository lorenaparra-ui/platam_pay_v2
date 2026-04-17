"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessMapper = void 0;
const business_entity_1 = require("../../../modules/businesses/domain/entities/business.entity");
class BusinessMapper {
    static to_domain(row) {
        return new business_entity_1.Business(row.id, row.externalId, row.personId, row.cityId, row.entityType, row.businessName ?? null, row.businessAddress ?? null, row.businessType ?? null, row.relationshipToBusiness ?? null, row.legalName ?? null, row.tradeName ?? null, row.taxId ?? null, row.yearOfEstablishment ?? null, row.createdAt, row.updatedAt);
    }
    static from_raw_row(row) {
        return new business_entity_1.Business(Number(row['id']), String(row['external_id']), Number(row['person_id']), row['city_id'] === null || row['city_id'] === undefined
            ? null
            : Number(row['city_id']), String(row['entity_type']), row['business_name'] ?? null, row['business_address'] ?? null, row['business_type'] ?? null, row['relationship_to_business'] ?? null, row['legal_name'] ?? null, row['trade_name'] ?? null, row['tax_id'] ?? null, row['year_of_establishment'] === null ||
            row['year_of_establishment'] === undefined
            ? null
            : Number(row['year_of_establishment']), new Date(String(row['created_at'])), new Date(String(row['updated_at'])));
    }
}
exports.BusinessMapper = BusinessMapper;
//# sourceMappingURL=business.mapper.js.map