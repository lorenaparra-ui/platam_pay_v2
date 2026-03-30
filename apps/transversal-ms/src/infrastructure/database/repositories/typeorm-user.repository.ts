import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/transversal-data';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import {
  User,
  CreateUserProps,
  UpdateUserProps,
} from '@modules/users/domain/models/user.models';
import { UserMapper } from '@infrastructure/database/mappers/user.mapper';

const USER_SELECT = {
  id: true,
  externalId: true,
  cognitoSub: true,
  email: true,
  roleId: true,
  statusId: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<User | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: USER_SELECT,
    });
    return row ? UserMapper.to_domain(row) : null;
  }

  async find_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null> {
    const row = await this.repo.findOne({
      where: { id: internal_id },
      select: { externalId: true },
    });
    return row?.externalId ?? null;
  }

  async find_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    return row?.id ?? null;
  }

  async find_all(): Promise<User[]> {
    const rows = await this.repo.find({
      select: USER_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => UserMapper.to_domain(r));
  }

  async create(props: CreateUserProps): Promise<User> {
    const rows = await this.repo.query(
      `INSERT INTO transversal_schema.users (
        external_id, cognito_sub, email, role_id, status_id, last_login_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5
      )
      RETURNING id, external_id, created_at, updated_at, cognito_sub, email, role_id, status_id, last_login_at`,
      [
        props.cognito_sub,
        props.email,
        props.role_id,
        props.status_id,
        props.last_login_at,
      ],
    );
    return UserMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateUserProps,
  ): Promise<User | null> {
    const existing = await this.repo.findOne({
      where: { externalId: external_id },
      select: { id: true },
    });
    if (!existing) {
      return null;
    }

    const columns: string[] = [];
    const values: unknown[] = [];
    let i = 1;

    const add = (col: string, val: unknown) => {
      columns.push(`"${col}" = $${i}`);
      values.push(val);
      i += 1;
    };

    if (patch.cognito_sub !== undefined) {
      add('cognito_sub', patch.cognito_sub);
    }
    if (patch.email !== undefined) {
      add('email', patch.email);
    }
    if (patch.role_id !== undefined) {
      add('role_id', patch.role_id);
    }
    if (patch.status_id !== undefined) {
      add('status_id', patch.status_id);
    }
    if (patch.last_login_at !== undefined) {
      add('last_login_at', patch.last_login_at);
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE transversal_schema.users SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
