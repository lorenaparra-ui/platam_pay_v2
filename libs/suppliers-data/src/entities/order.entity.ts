import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity({ name: 'purchase_orders', schema: 'suppliers_schema' })
export class PurchaseOrderEntity extends BaseExternalIdEntity {
  @Column({ name: 'user_id', type: 'varchar', length: 255 })
  userId: string;

  @Column({ name: 'supplier_id', type: 'bigint' })
  supplierId: number;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  amount: string;

  @Column({ name: 'document_url', type: 'text', nullable: true })
  documentUrl: string | null;
}
