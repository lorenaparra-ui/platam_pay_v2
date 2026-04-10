import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
import { PartnersEntity } from '@app/suppliers-data';

@Entity({ name: 'roles', schema: 'transversal_schema' })
export class RoleEntity extends BaseExternalIdEntity {
  @Column({ name: 'name', type: 'varchar', length: 80, unique: true })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;


  @ManyToOne(() => PartnersEntity, (p) => p.roles, { nullable: false })
  @JoinColumn({ name: 'partner_id', referencedColumnName: 'id' })
  partner: PartnersEntity;
}
