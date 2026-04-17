import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { PartnerPublicFields } from '@modules/partners/application/mapping/partner-public-fields.builder';

/** Respuesta HTTP de partner con propiedades en camelCase (sin id interno de BD). */
export class PartnerPublicCamelResponseDto {
  @ApiProperty({ format: 'uuid' })
  externalId!: string;

  @ApiProperty({ format: 'uuid' })
  supplierExternalId!: string;

  @ApiPropertyOptional({ nullable: true })
  acronym!: string | null;

  @ApiPropertyOptional({ nullable: true })
  logoUrl!: string | null;

  @ApiPropertyOptional({ nullable: true })
  coBrandingLogoUrl!: string | null;

  @ApiPropertyOptional({ nullable: true })
  primaryColor!: string | null;

  @ApiPropertyOptional({ nullable: true })
  secondaryColor!: string | null;

  @ApiPropertyOptional({ nullable: true })
  lightColor!: string | null;

  @ApiPropertyOptional({ nullable: true })
  notificationEmail!: string | null;

  @ApiPropertyOptional({ nullable: true })
  webhookUrl!: string | null;

  @ApiProperty()
  sendSalesRepVoucher!: boolean;

  @ApiPropertyOptional({ nullable: true })
  disbursementNotificationEmail!: string | null;

  @ApiProperty()
  state!: string;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;

  static from(fields: PartnerPublicFields): PartnerPublicCamelResponseDto {
    const d = new PartnerPublicCamelResponseDto();
    d.externalId = fields.external_id;
    d.supplierExternalId = fields.supplier_external_id;
    d.acronym = fields.acronym;
    d.logoUrl = fields.logo_url;
    d.coBrandingLogoUrl = fields.co_branding_logo_url;
    d.primaryColor = fields.primary_color;
    d.secondaryColor = fields.secondary_color;
    d.lightColor = fields.light_color;
    d.notificationEmail = fields.notification_email;
    d.webhookUrl = fields.webhook_url;
    d.sendSalesRepVoucher = fields.send_sales_rep_voucher;
    d.disbursementNotificationEmail = fields.disbursement_notification_email;
    d.state = fields.state;
    d.createdAt = fields.created_at;
    d.updatedAt = fields.updated_at;
    return d;
  }
}
