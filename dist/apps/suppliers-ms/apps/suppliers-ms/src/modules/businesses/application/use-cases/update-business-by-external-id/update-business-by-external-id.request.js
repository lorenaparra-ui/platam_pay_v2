"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBusinessByExternalIdRequest = void 0;
class UpdateBusinessByExternalIdRequest {
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
    constructor(external_id, person_external_id, city_external_id, entity_type, business_name, business_address, business_type, relationship_to_business, legal_name, trade_name, tax_id, year_of_establishment) {
        this.external_id = external_id;
        this.person_external_id = person_external_id;
        this.city_external_id = city_external_id;
        this.entity_type = entity_type;
        this.business_name = business_name;
        this.business_address = business_address;
        this.business_type = business_type;
        this.relationship_to_business = relationship_to_business;
        this.legal_name = legal_name;
        this.trade_name = trade_name;
        this.tax_id = tax_id;
        this.year_of_establishment = year_of_establishment;
    }
}
exports.UpdateBusinessByExternalIdRequest = UpdateBusinessByExternalIdRequest;
//# sourceMappingURL=update-business-by-external-id.request.js.map