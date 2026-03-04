import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class PartnerCategoryListQueryDto {
  @ApiPropertyOptional({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Filtra por UUID publico del partner",
  })
  @IsOptional()
  @IsUUID("4")
  partnerExternalId?: string;
}
