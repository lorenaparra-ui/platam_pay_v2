"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_business_public_fields = build_business_public_fields;
const common_1 = require("@nestjs/common");
async function build_business_public_fields(business, lookup) {
    const [person_external_id, city_external_id] = await Promise.all([
        lookup.get_person_external_id_by_internal_id(business.person_id),
        business.city_id === null
            ? Promise.resolve(null)
            : lookup.get_city_external_id_by_internal_id(business.city_id),
    ]);
    if (!person_external_id) {
        throw new common_1.InternalServerErrorException();
    }
    return {
        internal_id: business.internal_id,
        external_id: business.external_id,
        person_external_id,
        city_external_id,
        entity_type: business.entity_type,
        business_name: business.business_name,
        business_address: business.business_address,
        business_type: business.business_type,
        relationship_to_business: business.relationship_to_business,
        legal_name: business.legal_name,
        trade_name: business.trade_name,
        tax_id: business.tax_id,
        year_of_establishment: business.year_of_establishment,
        created_at: business.created_at,
        updated_at: business.updated_at,
    };
}
//# sourceMappingURL=business-public-fields.builder.js.map