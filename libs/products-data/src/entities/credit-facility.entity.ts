import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { CreditFacilityState } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { ContractEntity } from './contract.entity';
import { BusinessEntity } from '@app/suppliers-data';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'credit_facilities', schema: 'products_schema' })
export class CreditFacilityEntity extends BaseExternalIdEntity {
  @OneToOne(() => ContractEntity, { nullable: true })
  @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
  contract: ContractEntity | null;

  @Column({
    name: 'state',
    type: 'enum',
    enum: CreditFacilityState,
    enumName: 'credit_facility_state',
    default: CreditFacilityState.ACTIVE,
  })
  state: CreditFacilityState;

  @Column({
    name: 'total_limit',
    type: 'decimal',
    precision: 18,
    scale: 4,
  })
  totalLimit: string;

  @ManyToOne(() => BusinessEntity, { nullable: false })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity;

  @RelationId((cf: CreditFacilityEntity) => cf.business)
  businessId: number;

  @ManyToMany(() => CategoryEntity, (category) => category.creditFacility)
  @JoinTable({
    name: 'client_category_assignments',
    joinColumn: { name: 'credit_facility_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    schema: 'products_schema',
  })
  categories: CategoryEntity[];
}
