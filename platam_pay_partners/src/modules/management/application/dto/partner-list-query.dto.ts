import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class PartnerListQueryDto {
  @ApiPropertyOptional({
    example: "demo",
    description: "Busca por razon social",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}
