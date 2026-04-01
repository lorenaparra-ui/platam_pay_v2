import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Statuses } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { SupplierEntity } from './supplier.entity';

/**
 * Partner operativo; cada fila referencia exactamente un supplier (`supplier_id` UNIQUE NOT NULL).
 */
@Entity({ name: 'partners', schema: 'suppliers_schema' })
export class PartnersEntity extends BaseExternalIdEntity {
  @OneToOne(() => SupplierEntity, (s) => s.partner, { nullable: false })
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier: SupplierEntity;

  @Column({ name: 'acronym', type: 'varchar', length: 10, nullable: true })
  acronym: string | null;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl: string | null;

  @Column({ name: 'co_branding_logo_url', type: 'text', nullable: true })
  coBrandingLogoUrl: string | null;

  @Column({
    name: 'primary_color',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  primaryColor: string | null;

  @Column({
    name: 'secondary_color',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  secondaryColor: string | null;

  @Column({ name: 'light_color', type: 'varchar', length: 20, nullable: true })
  lightColor: string | null;

  @Column({ name: 'notification_email', type: 'varchar', nullable: true })
  notificationEmail: string | null;

  @Column({ name: 'webhook_url', type: 'text', nullable: true })
  webhookUrl: string | null;

  @Column({
    name: 'send_sales_rep_voucher',
    type: 'boolean',
    default: false,
  })
  sendSalesRepVoucher: boolean;

  @Column({
    name: 'disbursement_notification_email',
    type: 'varchar',
    nullable: true,
  })
  disbursementNotificationEmail: string | null;

  @Column({
    name: 'state',
    type: 'enum',
    enum: Statuses,
    enumName: 'partner_state',
    default: Statuses.ACTIVE,
  })
  state: Statuses;
}
