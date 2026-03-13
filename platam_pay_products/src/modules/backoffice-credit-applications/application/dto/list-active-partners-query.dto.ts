import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class ListActivePartnersQueryDto {
  @ApiPropertyOptional({
    description: "Filtro de texto por nombre comercial o legal del partner",
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;
}
