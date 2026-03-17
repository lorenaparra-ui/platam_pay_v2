import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('sales_representatives')
export class SalesRepresentativeEntity extends BaseExternalIdEntity {
  @Column({ name: 'partner_id', type: 'bigint' })
  partnerId: number;

  @Column({ name: 'user_id', type: 'bigint', nullable: true })
  userId: number | null;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'role', type: 'varchar', length: 100 })
  role: string;

  @Column({ name: 'status_id', type: 'bigint' })
  statusId: number;
}
