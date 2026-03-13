import { Transform } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  CREDIT_APPLICATION_STATUS_CODES,
  type CreditApplicationStatusCode,
} from "../../domain/models/credit-application-status-code.model";
import type { BackofficeCreditApplicationsSortBy } from "../../domain/ports/backoffice-credit-applications-read.repository.port";

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) =>
        String(item)
          .split(",")
          .map((token) => token.trim()),
      )
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((token) => token.trim())
      .filter(Boolean);
  }

  return [];
}

const SORT_BY_VALUES: BackofficeCreditApplicationsSortBy[] = [
  "most_recent",
  "oldest",
  "requested_credit_line_desc",
  "requested_credit_line_asc",
  "queue_days_desc",
];

export class ListCreditApplicationsQueryDto {
  @ApiPropertyOptional({
    description: "Tamaño de página para infinite scroll",
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Transform(({ value }) => (value != null ? Number(value) : undefined))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: "Cursor opaco para paginación keyset",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  cursor?: string;

  @ApiPropertyOptional({
    description: "Códigos de estado a filtrar",
    isArray: true,
    enum: CREDIT_APPLICATION_STATUS_CODES,
  })
  @IsOptional()
  @Transform(({ value }) => normalizeStringArray(value))
  @IsArray()
  @IsEnum(CREDIT_APPLICATION_STATUS_CODES, { each: true })
  status_codes?: CreditApplicationStatusCode[];

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

  @ApiPropertyOptional({
    description: "Ordenamiento de resultados",
    enum: SORT_BY_VALUES,
    default: "most_recent",
  })
  @IsOptional()
  @IsEnum(SORT_BY_VALUES)
  sort_by?: BackofficeCreditApplicationsSortBy;
}
