"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
class Business {
    internal_id;
    external_id;
    person_id;
    city_id;
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
    constructor(internal_id, external_id, person_id, city_id, entity_type, business_name, business_address, business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.person_id = person_id;
        this.city_id = city_id;
        this.entity_type = entity_type;
        this.business_name = business_name;
        this.business_address = business_address;
        this.business_type = business_type;
        this.relationship_to_business = relationship_to_business;
        this.legal_name = legal_name;
        this.trade_name = trade_name;
        this.tax_id = tax_id;
        this.year_of_establishment = year_of_establishment;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.Business = Business;
//# sourceMappingURL=business.entity.js.map