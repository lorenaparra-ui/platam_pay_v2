"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map_update_partner_payload_to_request = map_update_partner_payload_to_request;
const update_partner_by_external_id_request_1 = require("../../application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request");
function map_update_partner_payload_to_request(external_id, dto, urls) {
    const p = dto.partner;
    return new update_partner_by_external_id_request_1.UpdatePartnerByExternalIdRequest(external_id, p?.acronym, urls.logo_url, urls.co_branding_logo_url, p?.primaryColor, p?.secondaryColor, p?.lightColor, p?.notificationEmail, p?.webhookUrl, p?.sendSalesRepVoucher, p?.disbursementNotificationEmail, p?.state);
}
//# sourceMappingURL=update-partner-payload.mapper.js.map