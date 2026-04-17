"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBusinessResponse = void 0;
class CreateBusinessResponse {
    internal_id;
    external_id;
    person_external_id;
    city_external_id;
    entity_type;
    business_name;
    business_address;
    business_type;
    relationship_to_business;
    legal_name;
    trade_name;
    tax_id;
    year_of_establishment;
    created_at;
    updated_at;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.CreateBusinessResponse = CreateBusinessResponse;
//# sourceMappingURL=create-business.response.js.map