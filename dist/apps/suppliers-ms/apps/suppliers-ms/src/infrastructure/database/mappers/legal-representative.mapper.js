"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalRepresentativeMapper = void 0;
const legal_representative_entity_1 = require("../../../modules/legal-representatives/domain/entities/legal-representative.entity");
exports.LegalRepresentativeMapper = {
    to_domain(row) {
        return new legal_representative_entity_1.LegalRepresentative(Number(row.id), row.externalId, row.businessId, row.personId, row.isPrimary, row.createdAt, row.updatedAt);
    },
    from_raw_row(row) {
        return new legal_representative_entity_1.LegalRepresentative(Number(row.id), String(row.external_id), Number(row.business_id), Number(row.person_id), Boolean(row.is_primary), row.created_at, row.updated_at);
    },
};
//# sourceMappingURL=legal-representative.mapper.js.map