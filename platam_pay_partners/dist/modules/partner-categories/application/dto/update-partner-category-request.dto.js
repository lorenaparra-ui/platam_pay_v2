"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePartnerCategoryRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_partner_category_request_dto_1 = require("./create-partner-category-request.dto");
class UpdatePartnerCategoryRequestDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_partner_category_request_dto_1.CreatePartnerCategoryRequestDto, ["partnerExternalId"])) {
}
exports.UpdatePartnerCategoryRequestDto = UpdatePartnerCategoryRequestDto;
//# sourceMappingURL=update-partner-category-request.dto.js.map