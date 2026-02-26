import { Column, Entity } from "typeorm";
import { BaseExternalIdEntity } from "./base-external-id.entity";

@Entity({ name: "partners" })
export class PartnersEntity extends BaseExternalIdEntity {
  @Column({ name: "country_code", type: "varchar", length: 2, nullable: true })
  countryCode: string | null;

  @Column({ name: "company_name", type: "varchar", length: 255 })
  companyName: string;

  @Column({ name: "trade_name", type: "varchar", length: 255, nullable: true })
  tradeName: string | null;

  @Column({ name: "acronym", type: "varchar", length: 10, nullable: true })
  acronym: string | null;

  @Column({ name: "logo_url", type: "text", nullable: true })
  logoUrl: string | null;

  @Column({ name: "co_branding_logo_url", type: "text", nullable: true })
  coBrandingLogoUrl: string | null;

  @Column({
    name: "primary_color",
    type: "varchar",
    length: 20,
    nullable: true,
  })
  primaryColor: string | null;

  @Column({
    name: "secondary_color",
    type: "varchar",
    length: 20,
    nullable: true,
  })
  secondaryColor: string | null;

  @Column({ name: "light_color", type: "varchar", length: 20, nullable: true })
  lightColor: string | null;

  @Column({
    name: "sales_rep_role_name",
    type: "varchar",
    length: 50,
    default: "Sales Rep",
    nullable: true,
  })
  salesRepRoleName: string | null;

  @Column({
    name: "sales_rep_role_name_plural",
    type: "varchar",
    length: 50,
    default: "Sales Reps",
    nullable: true,
  })
  salesRepRoleNamePlural: string | null;

  @Column({ name: "api_key_hash", type: "varchar", nullable: true })
  apiKeyHash: string | null;

  @Column({ name: "notification_email", type: "varchar", nullable: true })
  notificationEmail: string | null;

  @Column({ name: "webhook_url", type: "text", nullable: true })
  webhookUrl: string | null;

  @Column({
    name: "send_sales_rep_voucher",
    type: "boolean",
    default: false,
    nullable: true,
  })
  sendSalesRepVoucher: boolean;

  @Column({
    name: "disbursement_notification_email",
    type: "varchar",
    nullable: true,
  })
  disbursementNotificationEmail: string | null;

  @Column({ name: "default_rep_id", type: "bigint", nullable: true })
  defaultRepId: number | null;

  @Column({ name: "default_category_id", type: "bigint", nullable: true })
  defaultCategoryId: number | null;

  @Column({
    name: "status_id",
    type: "bigint",
    nullable: false,
    default: () => "get_status_id('partners', 'active')",
  })
  statusId: number;
}
