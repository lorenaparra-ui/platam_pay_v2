import { ApiProperty } from "@nestjs/swagger";

export class PartnerResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "UUID publico del partner",
  })
  externalId: string;

  @ApiProperty({
    example: 42,
    description: "ID interno del negocio asociado",
  })
  businessId: number;

  @ApiProperty({
    example: "PDP",
    nullable: true,
    description: "Acronimo del partner",
  })
  acronym: string | null;

  @ApiProperty({
    example: "https://cdn.platam.com/partners/logo.png",
    nullable: true,
    description: "URL del logo principal",
  })
  logoUrl: string | null;

  @ApiProperty({
    example: "https://cdn.platam.com/partners/cobranding-logo.png",
    nullable: true,
    description: "URL del logo co-branding",
  })
  coBrandingLogoUrl: string | null;

  @ApiProperty({
    example: "#123456",
    nullable: true,
    description: "Color primario del partner",
  })
  primaryColor: string | null;

  @ApiProperty({
    example: "#654321",
    nullable: true,
    description: "Color secundario del partner",
  })
  secondaryColor: string | null;

  @ApiProperty({
    example: "#f5f5f5",
    nullable: true,
    description: "Color claro del partner",
  })
  lightColor: string | null;

  @ApiProperty({
    example: "Sales Rep",
    nullable: true,
    description: "Nombre singular del rol de vendedores",
  })
  salesRepRoleName: string | null;

  @ApiProperty({
    example: "Sales Reps",
    nullable: true,
    description: "Nombre plural del rol de vendedores",
  })
  salesRepRoleNamePlural: string | null;

  @ApiProperty({
    example: "ops@partner.com",
    nullable: true,
    description: "Email de notificaciones",
  })
  notificationEmail: string | null;

  @ApiProperty({
    example: "https://partner.com/webhooks/platam",
    nullable: true,
    description: "URL de webhook",
  })
  webhookUrl: string | null;

  @ApiProperty({
    example: false,
    description: "Indica si envia voucher al sales rep",
  })
  sendSalesRepVoucher: boolean;

  @ApiProperty({
    example: "payouts@partner.com",
    nullable: true,
    description: "Email de notificacion de desembolso",
  })
  disbursementNotificationEmail: string | null;

  @ApiProperty({
    example: 10,
    nullable: true,
    description: "ID interno del representante por defecto",
  })
  defaultRepId: number | null;

  @ApiProperty({
    example: 1,
    description: "ID interno de estado",
  })
  statusId: number;

  @ApiProperty({
    example: "2026-02-19T14:25:00.000Z",
    description: "Fecha de creacion",
  })
  createdAt: string;

  @ApiProperty({
    example: "2026-02-19T14:25:00.000Z",
    description: "Fecha de actualizacion",
  })
  updatedAt: string;
}
