import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * DTO de respuesta para solicitud de crédito BNPL.
 * Montos en centavos; fechas en ISO 8601.
 */
export class CreditApplicationBnplResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "UUID público de la solicitud",
  })
  externalId: string;

  @ApiProperty({ example: 1, description: "ID del usuario" })
  userId: number;

  @ApiPropertyOptional({
    example: 2,
    description: "ID del producto de usuario",
  })
  userProductId: number | null;

  @ApiPropertyOptional({ example: 3, description: "ID del partner" })
  partnerId: number | null;

  @ApiPropertyOptional({
    example: 1,
    description: "ID de categoría del partner",
  })
  partnerCategoryId: number | null;

  @ApiPropertyOptional({
    example: 5,
    description: "ID del representante de ventas",
  })
  salesRepId: number | null;

  @ApiPropertyOptional({ example: 10, description: "ID del negocio" })
  businessId: number | null;

  @ApiPropertyOptional({ example: 3 }) numberOfLocations: number | null;
  @ApiPropertyOptional({ example: 15 }) numberOfEmployees: number | null;
  @ApiPropertyOptional({ example: "5-10" }) businessSeniority: string | null;
  @ApiPropertyOptional({ example: "5+" }) sectorExperience: string | null;
  @ApiPropertyOptional({ example: 120 }) businessFlagshipM2: number | null;
  @ApiPropertyOptional({ example: true }) businessHasRent: boolean | null;
  @ApiPropertyOptional({ example: 500000 }) businessRentAmount: number | null;
  @ApiPropertyOptional({ example: 2000000 }) monthlyIncome: number | null;
  @ApiPropertyOptional({ example: 800000 }) monthlyExpenses: number | null;
  @ApiPropertyOptional({ example: 1500000 }) monthlyPurchases: number | null;
  @ApiPropertyOptional({ example: 300000 }) currentPurchases: number | null;
  @ApiPropertyOptional({ example: 10000000 }) totalAssets: number | null;
  @ApiPropertyOptional({ example: 5000000 }) requestedCreditLine: number | null;
  @ApiProperty({ example: false }) isCurrentClient: boolean;
  @ApiProperty({ example: 1 }) statusId: number;
  @ApiPropertyOptional() submissionDate: string | null;
  @ApiPropertyOptional() approvalDate: string | null;
  @ApiPropertyOptional({ example: "Documentación incompleta" })
  rejectionReason: string | null;
  @ApiPropertyOptional() creditStudyDate: string | null;
  @ApiPropertyOptional({ example: 750.5 }) creditScore: number | null;
  @ApiPropertyOptional({ example: "APPROVED" }) creditDecision: string | null;
  @ApiPropertyOptional({ example: 4000000 }) approvedCreditLine: number | null;
  @ApiPropertyOptional() analystReport: string | null;
  @ApiPropertyOptional({ example: "MEDIUM" }) riskProfile: string | null;
  @ApiProperty({ example: true }) privacyPolicyAccepted: boolean;
  @ApiPropertyOptional() privacyPolicyDate: string | null;
  @ApiProperty({ example: "2026-02-27T12:00:00.000Z" }) createdAt: string;
  @ApiProperty({ example: "2026-02-27T12:00:00.000Z" }) updatedAt: string;
}
