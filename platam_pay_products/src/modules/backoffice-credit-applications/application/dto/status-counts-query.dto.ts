import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class StatusCountsQueryDto {
  @ApiPropertyOptional({
    description: "UUID público del partner para filtrar",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsOptional()
  @IsUUID("4")
  partner_external_id?: string;

  @ApiPropertyOptional({
    description:
      "Búsqueda multi-campo: cliente, documento, id solicitud y nombre de negocio",
    maxLength: 120,
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;
}
