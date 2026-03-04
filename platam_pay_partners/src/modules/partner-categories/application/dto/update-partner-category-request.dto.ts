import { OmitType, PartialType } from "@nestjs/swagger";
import { CreatePartnerCategoryRequestDto } from "./create-partner-category-request.dto";

export class UpdatePartnerCategoryRequestDto extends PartialType(
  OmitType(CreatePartnerCategoryRequestDto, ["partnerExternalId"]),
) {}
