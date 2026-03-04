import { OmitType, PartialType } from "@nestjs/swagger";
import { CreatePartnerRequestDto } from "./create-partner-request.dto";

export class UpdatePartnerRequestDto extends PartialType(
  OmitType(CreatePartnerRequestDto, ["categories", "defaultCategoryIndex"]),
) {}
