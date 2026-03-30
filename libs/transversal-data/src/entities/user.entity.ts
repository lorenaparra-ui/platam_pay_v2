import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'users', schema: 'transversal_schema' })
export class UserEntity extends BaseExternalIdEntity {
  @Column({ name: 'cognito_sub', type: 'uuid', unique: true })
  cognitoSub: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'role_id', type: 'bigint', nullable: true })
  roleId: number | null;

  @Column({
    name: 'status_id',
    type: 'bigint',
    default: () => "get_status_id('users', 'active')",
  })
  statusId: number;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;
}
