import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class ChangePartnerStatusRequestDto {
  @ApiProperty({
    example: "inactive",
    enum: ["active", "inactive"],
    description: "Nuevo estado del partner",
  })
  @IsIn(["active", "inactive"])
  statusCode: "active" | "inactive";
}
