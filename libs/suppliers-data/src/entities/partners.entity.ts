import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../../../products-data/src/entities/category.entity';
import { PartnerState } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';
import { SalesRepresentativeEntity } from './sales-representative.entity';
import { SupplierEntity } from './supplier.entity';
import { RoleEntity } from '@app/transversal-data';

/**
 * Partner operativo. Propiedades en orden DBML tras `BaseExternalIdEntity`; `supplier` refleja `supplier_id` del DDL.
 */
@Entity({ name: 'partners', schema: 'suppliers_schema' })
@Index('IDX_partners_state', ['state'])
@Index('IDX_partners_business_id', ['business'])
export class PartnersEntity extends BaseExternalIdEntity {
  @ManyToOne(() => BusinessEntity, { nullable: false })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity;

  @OneToOne(() => SupplierEntity, (s) => s.partner, { nullable: false })
  @JoinColumn({ name: 'supplier_id', referencedColumnName: 'id' })
  supplier: SupplierEntity;

  @Column({
    name: 'alias',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: true,
  })
  alias: string | null;

  @Column({ name: 'acronym', type: 'varchar', length: 10, nullable: true })
  acronym: string | null;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl: string | null;

  @Column({ name: 'co_branding_logo_url', type: 'text', nullable: true })
  coBrandingLogoUrl: string | null;

  @Column({
    name: 'primary_color',
    type: 'varchar',
    length: 7,
    nullable: true,
  })
  primaryColor: string | null;

  @Column({
    name: 'secondary_color',
    type: 'varchar',
    length: 7,
    nullable: true,
  })
  secondaryColor: string | null;

  @Column({ name: 'light_color', type: 'varchar', length: 7, nullable: true })
  lightColor: string | null;

  @Column({ name: 'notification_email', type: 'varchar', nullable: true })
  notificationEmail: string | null;

  @Column({ name: 'webhook_url', type: 'text', nullable: true })
  webhookUrl: string | null;

  @Column({
    name: 'disbursement_notification_email',
    type: 'varchar',
    nullable: true,
  })
  disbursementNotificationEmail: string | null;

  @Column({ name: 'api_key_hash', type: 'text', nullable: true })
  apiKeyHash: string | null;

  @Column({
    name: 'send_sales_rep_voucher',
    type: 'boolean',
    default: false,
  })
  sendSalesRepVoucher: boolean;

  @OneToMany(() => RoleEntity, (r) => r.partner)
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  roles: RoleEntity[];


  @OneToMany(() => SalesRepresentativeEntity, (sr) => sr.partner)
  salesRepresentatives: SalesRepresentativeEntity[];

  
  @OneToMany(() => CategoryEntity, (c) => c.partner)
  categories: CategoryEntity[];

  @Column({ name: 'country_code', type: 'varchar', length: 2, nullable: true })
  countryCode: string | null;

  @Column({
    name: 'state',
    type: 'enum',
    enum: PartnerState,
    enumName: 'partner_state',
    default: PartnerState.ACTIVE,
  })
  state: PartnerState;
}
