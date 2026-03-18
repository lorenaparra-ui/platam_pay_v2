import { Column, Entity, Index } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('cities')
@Index(['countryCode', 'stateName', 'cityName'], { unique: true })
export class CityEntity extends BaseExternalIdEntity {
  @Column({ name: 'country_name', type: 'varchar', length: 120 })
  countryName: string;

  @Column({ name: 'country_code', type: 'varchar', length: 2 })
  countryCode: string;

  @Column({ name: 'state_name', type: 'varchar', length: 120 })
  stateName: string;

  @Column({ name: 'state_code', type: 'varchar', length: 3, nullable: true })
  stateCode: string | null;

  @Column({ name: 'city_name', type: 'varchar', length: 120 })
  cityName: string;

  @Column({ name: 'currency_id', type: 'bigint' })
  currencyId: number;
}
