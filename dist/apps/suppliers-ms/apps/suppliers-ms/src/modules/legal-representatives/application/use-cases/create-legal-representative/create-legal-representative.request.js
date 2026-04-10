"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLegalRepresentativeRequest = void 0;
class CreateLegalRepresentativeRequest {
    person_internal_id;
    is_primary;
    business_internal_id;
    constructor(person_internal_id, is_primary, business_internal_id) {
        this.person_internal_id = person_internal_id;
        this.is_primary = is_primary;
        this.business_internal_id = business_internal_id;
    }
}
exports.CreateLegalRepresentativeRequest = CreateLegalRepresentativeRequest;
//# sourceMappingURL=create-legal-representative.request.js.map