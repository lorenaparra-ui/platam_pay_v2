import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class PartnerListQueryDto {
  @ApiPropertyOptional({
    example: "PDP",
    description: "Busca por acronimo",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}
