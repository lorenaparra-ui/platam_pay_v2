"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalRepresentative = void 0;
class LegalRepresentative {
    internal_id;
    external_id;
    business_id;
    person_id;
    is_primary;
    created_at;
    updated_at;
    constructor(internal_id, external_id, business_id, person_id, is_primary, created_at, updated_at) {
        this.internal_id = internal_id;
        this.external_id = external_id;
        this.business_id = business_id;
        this.person_id = person_id;
        this.is_primary = is_primary;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.LegalRepresentative = LegalRepresentative;
//# sourceMappingURL=legal-representative.entity.js.map