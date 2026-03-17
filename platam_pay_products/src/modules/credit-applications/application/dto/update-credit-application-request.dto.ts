import { PartialType } from "@nestjs/swagger";
import { CreateCreditApplicationRequestDto } from "./create-credit-application-request.dto";

export class UpdateCreditApplicationRequestDto extends PartialType(
  CreateCreditApplicationRequestDto,
) {}
