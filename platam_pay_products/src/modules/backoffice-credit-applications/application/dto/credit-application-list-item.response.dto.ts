import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  CREDIT_APPLICATION_STATUS_CODES,
  type CreditApplicationStatusCode,
} from "../../domain/models/credit-application-status-code.model";
import type {
  CustomerType,
  QueueLevel,
} from "../../domain/models/backoffice-credit-application-list-item.model";

export class CreditApplicationListItemResponseDto {
  @ApiProperty({ example: 847 })
  application_id: number;

  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  application_external_id: string;

  @ApiPropertyOptional({ example: "550e8400-e29b-41d4-a716-446655440000" })
  partner_external_id: string | null;

  @ApiPropertyOptional({ example: "https://cdn.example.com/logo.png" })
  partner_logo_url: string | null;

  @ApiPropertyOptional({ example: "Carlos Alberto Munoz" })
  customer_full_name: string | null;

  @ApiPropertyOptional({ enum: ["PN", "PJ"] })
  customer_type: CustomerType | null;

  @ApiPropertyOptional({ example: "CC" })
  doc_type: string | null;

  @ApiPropertyOptional({ example: "3102759655" })
  doc_number: string | null;

  @ApiPropertyOptional({ example: "3102759655" })
  phone: string | null;

  @ApiPropertyOptional({ example: "cliente@correo.com" })
  email: string | null;

  @ApiPropertyOptional({ example: "Laura Perez" })
  sales_rep_name: string | null;

  @ApiPropertyOptional({
    description: "Monto en unidad mínima (COP)",
    example: 8000000,
  })
  requested_credit_line: number | null;

  @ApiPropertyOptional({
    description: "Fecha de registro en formato ISO 8601",
    example: "2026-03-10T14:12:00.000Z",
  })
  submission_date: string | null;

  @ApiPropertyOptional({
    description: "Días en cola; solo para in_study",
    example: 4,
  })
  queue_days: number | null;

  @ApiPropertyOptional({
    description: "Nivel visual de cola; solo para in_study",
    enum: ["neutral", "warning", "critical"],
  })
  queue_level: QueueLevel | null;

  @ApiPropertyOptional({ enum: CREDIT_APPLICATION_STATUS_CODES })
  status_code: CreditApplicationStatusCode | null;

  @ApiPropertyOptional({ example: "En estudio" })
  status_display_name: string | null;
}
