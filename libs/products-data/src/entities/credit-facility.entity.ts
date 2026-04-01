import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Statuses } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CategoryEntity } from './category.entity';
import { ContractEntity } from './contract.entity';

@Entity({ name: 'credit_facilities', schema: 'products_schema' })
export class CreditFacilityEntity extends BaseExternalIdEntity {
  @OneToOne(() => ContractEntity, { nullable: true })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contractId: ContractEntity | null;

  @Column({
    name: 'state',
    type: 'enum',
    enum: Statuses,
    enumName: 'credit_facility_state',
    default: Statuses.ACTIVE,
  })
  state: Statuses;

  @Column({
    name: 'total_limit',
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  totalLimit: string;

  @OneToMany(() => CategoryEntity, (category) => category.creditFacility)
  categories: CategoryEntity[];
}
