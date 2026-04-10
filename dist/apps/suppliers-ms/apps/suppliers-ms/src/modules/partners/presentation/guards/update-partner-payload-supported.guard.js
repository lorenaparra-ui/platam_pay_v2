"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_update_partner_payload_supported = assert_update_partner_payload_supported;
exports.update_payload_has_partner_changes = update_payload_has_partner_changes;
const common_1 = require("@nestjs/common");
function object_has_defined_values(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return Object.values(obj).some((v) => v !== undefined);
}
function assert_update_partner_payload_supported(dto) {
    const unsupported = [];
    if (object_has_defined_values(dto.operatingUser)) {
        unsupported.push('operatingUser');
    }
    if (object_has_defined_values(dto.business)) {
        unsupported.push('business');
    }
    if (object_has_defined_values(dto.bankAccount)) {
        unsupported.push('bankAccount');
    }
    if (object_has_defined_values(dto.creditFacility)) {
        unsupported.push('creditFacility');
    }
    if (dto.category !== undefined && dto.category.length > 0) {
        unsupported.push('category');
    }
    if (unsupported.length > 0) {
        throw new common_1.HttpException(`Actualización no implementada para: ${unsupported.join(', ')}. Solo se persisten campos de la sección partner (camelCase) y URLs de logo/coBranding vía multipart.`, common_1.HttpStatus.NOT_IMPLEMENTED);
    }
}
function update_payload_has_partner_changes(dto) {
    return object_has_defined_values(dto.partner);
}
//# sourceMappingURL=update-partner-payload-supported.guard.js.map