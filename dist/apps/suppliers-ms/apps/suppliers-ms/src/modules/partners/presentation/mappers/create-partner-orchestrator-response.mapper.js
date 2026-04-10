"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map_orchestrator_result_to_http = map_orchestrator_result_to_http;
const create_partner_orchestrator_response_dto_1 = require("../dto/create-partner-orchestrator-response.dto");
function map_orchestrator_result_to_http(res) {
    const dto = new create_partner_orchestrator_response_dto_1.CreatePartnerOrchestratorResponseDto();
    dto.sagaExternalId = res.saga_external_id;
    dto.correlationId = res.correlation_id;
    dto.creditFacilityExternalId = res.credit_facility_external_id;
    dto.userExternalId = res.user_external_id;
    dto.personExternalId = res.person_external_id;
    dto.legalRepresentativeExternalId = res.legal_representative_external_id;
    dto.businessExternalId = res.business_external_id;
    dto.bankCertificationUrl = res.bank_certification_url;
    dto.logoUrl = res.logo_url;
    dto.coBrandingUrl = res.co_branding_url;
    dto.bankAccountExternalId = res.bank_account_external_id;
    dto.supplierExternalId = res.supplier_external_id;
    dto.partnerExternalId = res.partner_external_id;
    return dto;
}
//# sourceMappingURL=create-partner-orchestrator-response.mapper.js.map