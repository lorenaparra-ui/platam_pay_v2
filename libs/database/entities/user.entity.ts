import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('users')
export class UserEntity extends BaseExternalIdEntity {
  @Column({ name: 'cognito_sub', type: 'uuid', unique: true })
  cognitoSub: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', unique: true, nullable: true })
  phone: string | null;

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
