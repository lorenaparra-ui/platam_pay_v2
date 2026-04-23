import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';

import { RoleEntity } from './role.entity';
import { PersonEntity } from './person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { UserState } from '@platam/shared';


@Entity({ name: 'users', schema: 'transversal_schema' })
export class UserEntity extends BaseExternalIdEntity {
  @Column({ name: 'cognito_sub', type: 'uuid', unique: true })
  cognitoSub: string;

  @Column({ name: 'email', type: 'varchar', length: 320, unique: true })
  email: string;

  /** Permisos globales del usuario: solo a través de este rol → `role_permissions`. */
  @ManyToOne(() => RoleEntity, { nullable: false })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;

  @RelationId((u: UserEntity) => u.role)
  roleId: number;

  @ManyToOne(() => UserEntity, (user) => user.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parent: UserEntity | null;

  @RelationId((u: UserEntity) => u.parent)
  parent_id: number | null;

  /**
   * Path materializado `id/id/.../` (triggers en BD). Consultas prefijo: `LIKE path || '%'`.
   */
  @Column({ name: 'hierarchy_path', type: 'text' })
  hierarchyPath: string;

  @OneToMany(() => UserEntity, (user) => user.parent)
  children: UserEntity[];

  @Column({
    name: 'state',
    type: 'enum',
    enum: UserState,
    enumName: 'user_state',
    default: UserState.ACTIVE,
  })
  state: UserState;

  @OneToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @RelationId((u: UserEntity) => u.person)
  personId: number | null;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;
}
