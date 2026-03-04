import { ApiProperty } from "@nestjs/swagger";

export class PartnerCategoryResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "UUID publico de la categoria",
  })
  externalId: string;

  @ApiProperty({
    example: 10,
    description: "ID interno del partner propietario",
  })
  partnerId: number;

  @ApiProperty({ example: "Electro" })
  name: string;

  @ApiProperty({ example: "0.1500" })
  discountPercentage: string;

  @ApiProperty({ example: "0.0200" })
  interestRate: string;

  @ApiProperty({ example: "0.0100", nullable: true })
  disbursementFeePercent: string | null;

  @ApiProperty({ example: "25000", nullable: true })
  minimumDisbursementFee: string | null;

  @ApiProperty({ example: 3 })
  delayDays: number;

  @ApiProperty({ example: 30 })
  termDays: number;

  @ApiProperty({ example: 1 })
  statusId: number;

  @ApiProperty({ example: "2026-02-19T14:25:00.000Z" })
  createdAt: string;

  @ApiProperty({ example: "2026-02-19T14:25:00.000Z" })
  updatedAt: string;
}
