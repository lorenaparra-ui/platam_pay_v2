import { Column, Entity ,JoinColumn, ManyToOne, OneToOne} from 'typeorm';

 
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

  @ManyToOne(() => RoleEntity, { nullable: false })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;

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

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;
}
