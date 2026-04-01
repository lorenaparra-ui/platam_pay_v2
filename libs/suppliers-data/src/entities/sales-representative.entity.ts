import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity({ name: 'sales_representatives', schema: 'suppliers_schema' })
export class SalesRepresentativeEntity extends BaseExternalIdEntity {
  @Column({ name: 'partner_id', type: 'bigint' })
  partnerId: number;

  @Column({ name: 'user_id', type: 'bigint', nullable: true })
  userId: number | null;
}
