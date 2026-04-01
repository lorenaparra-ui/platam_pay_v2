import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CreditFacilitiesStatuses } from '@platam/shared';
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
    enum: CreditFacilitiesStatuses,
    enumName: 'credit_facility_state',
    default: CreditFacilitiesStatuses.ACTIVE,
  })
  state: CreditFacilitiesStatuses;

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
