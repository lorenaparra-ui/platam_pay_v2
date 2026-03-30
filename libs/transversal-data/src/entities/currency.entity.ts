import { Column, Entity, Index } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'currencies', schema: 'transversal_schema' })
@Index(['code'], { unique: true })
export class CurrencyEntity extends BaseExternalIdEntity {
  @Column({ name: 'code', type: 'varchar', length: 3 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 120 })
  name: string;

  @Column({ name: 'symbol', type: 'varchar', length: 10, nullable: true })
  symbol: string | null;

  @Column({ name: 'decimal_places', type: 'int', default: 2 })
  decimalPlaces: number;

  @Column({
    name: 'thousand_separator',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  thousandSeparator: string | null;

  @Column({
    name: 'decimal_separator',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  decimalSeparator: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
