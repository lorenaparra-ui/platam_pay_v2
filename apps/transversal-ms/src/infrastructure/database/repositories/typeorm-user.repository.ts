import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '@app/transversal-data';
import { Roles } from '@platam/shared';
import { UserRepository } from '@modules/users/domain/ports/user.ports';
import {
  User,
  CreateUserProps,
  UpdateUserProps,
  UserVisibilityScope,
} from '@modules/users/domain/models/user.models';
import { UserMapper } from '@infrastructure/database/mappers/user.mapper';
import { normalize_cognito_sub } from '@common/utils/normalize-cognito-sub';

const BACK_OFFICE_UNRESTRICTED = new Set<Roles>([
  Roles.BACK_OFFICE_ADMIN,
  Roles.BACK_OFFICE_ANALYST,
]);

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<User | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
    });
    return row ? UserMapper.to_domain(row) : null;
  }

  async find_by_email(email: string): Promise<User | null> {
    const row = await this.repo.findOne({
      where: { email: email.trim().toLowerCase() },
    });
    return row ? UserMapper.to_domain(row) : null;
  }

  async find_by_cognito_sub(cognito_sub: string): Promise<User | null> {
    const normalized = normalize_cognito_sub(cognito_sub);
    const row = await this.repo.findOne({
      where: { cognitoSub: normalized },
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
      order: { id: 'ASC' },
    });
    return rows.map((r) => UserMapper.to_domain(r));
  }

  async find_all_where_internal_id_in(
    internal_ids: readonly number[],
  ): Promise<User[]> {
    if (internal_ids.length === 0) {
      return [];
    }
    const rows = await this.repo.find({
      where: { id: In([...internal_ids]) },
      order: { id: 'ASC' },
    });
    return rows.map((r) => UserMapper.to_domain(r));
  }

  async find_descendant_internal_ids_under(
    internal_id: number,
  ): Promise<readonly number[]> {
    const rows = (await this.repo.query(
      `SELECT u.id
       FROM transversal_schema.users u
       INNER JOIN transversal_schema.users a ON a.id = $1
       WHERE u.id <> a.id
         AND u.hierarchy_path LIKE a.hierarchy_path || '%'
       ORDER BY u.id ASC`,
      [internal_id],
    )) as Array<{ id: string | number }>;
    return rows.map((r) => Number(r.id));
  }

  async find_subtree_internal_ids_under(
    internal_id: number,
  ): Promise<readonly number[]> {
    const rows = (await this.repo.query(
      `SELECT u.id
       FROM transversal_schema.users u
       INNER JOIN transversal_schema.users a ON a.id = $1
       WHERE u.hierarchy_path LIKE a.hierarchy_path || '%'
       ORDER BY u.id ASC`,
      [internal_id],
    )) as Array<{ id: string | number }>;
    return rows.map((r) => Number(r.id));
  }

  async resolve_visible_internal_user_ids_for_role(
    actor_internal_id: number,
    role_code: Roles,
  ): Promise<UserVisibilityScope> {
    if (BACK_OFFICE_UNRESTRICTED.has(role_code)) {
      return { kind: 'unrestricted' };
    }
    const ids = await this.find_subtree_internal_ids_under(actor_internal_id);
    return { kind: 'subset', internal_user_ids: ids };
  }

  async create(props: CreateUserProps): Promise<User> {
    const parent_id =
      props.parent_id === undefined ? null : props.parent_id;
    const person_id =
      props.person_id === undefined ? null : props.person_id;
    const rows = await this.repo.query(
      `INSERT INTO transversal_schema.users (
        external_id, cognito_sub, email, role_id, state, last_login_at, parent_id, person_id
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4::"transversal_schema"."user_state", $5, $6, $7
      )
      RETURNING id, external_id, created_at, updated_at, cognito_sub, email, role_id, state, last_login_at, parent_id, person_id, hierarchy_path`,
      [
        normalize_cognito_sub(props.cognito_sub),
        props.email,
        props.role_id,
        props.state,
        props.last_login_at,
        parent_id,
        person_id,
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
      add('cognito_sub', normalize_cognito_sub(patch.cognito_sub));
    }
    if (patch.email !== undefined) {
      add('email', patch.email);
    }
    if (patch.role_id !== undefined) {
      add('role_id', patch.role_id);
    }
    if (patch.state !== undefined) {
      add('state', patch.state);
    }
    if (patch.last_login_at !== undefined) {
      add('last_login_at', patch.last_login_at);
    }
    if (patch.parent_id !== undefined) {
      add('parent_id', patch.parent_id);
    }
    if (patch.person_id !== undefined) {
      add('person_id', patch.person_id);
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
