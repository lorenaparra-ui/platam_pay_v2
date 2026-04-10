import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { SalesRepresentativeRecordState } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { PartnersEntity } from './partners.entity';
import { UserEntity } from '@app/transversal-data';

@Entity({ name: 'sales_representatives', schema: 'suppliers_schema' })
export class SalesRepresentativeEntity extends BaseExternalIdEntity {
  @ManyToOne(() => PartnersEntity, (p) => p.salesRepresentatives, {
    nullable: false,
  })
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  partner: PartnersEntity;

  @RelationId((sr: SalesRepresentativeEntity) => sr.partner)
  partnerId: number;

  @Column({
    name: 'state',
    type: 'enum',
    enum: SalesRepresentativeRecordState,
    enumName: 'sales_representative_state',
    default: SalesRepresentativeRecordState.ACTIVE,
  })
  state: SalesRepresentativeRecordState;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @RelationId((sr: SalesRepresentativeEntity) => sr.user)
  userId: number;
}
