"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartnerRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_partner_request_dto_1 = require("./create-partner-request.dto");
class UpdatePartnerRequestDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_partner_request_dto_1.CreatePartnerRequestDto, ["categories", "defaultCategoryIndex"])) {
}
exports.UpdatePartnerRequestDto = UpdatePartnerRequestDto;
//# sourceMappingURL=update-partner-request.dto.js.map