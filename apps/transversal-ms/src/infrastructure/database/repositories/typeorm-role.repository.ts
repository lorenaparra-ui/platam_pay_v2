import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '@app/transversal-data';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';
import type {
  Role,
  CreateRoleProps,
  UpdateRoleProps,
  ListRolesParams,
} from '@modules/transversal/domain/models/role.models';
import { RoleMapper } from '@infrastructure/database/mappers/role.mapper';

const ROLE_SELECT = {
  id: true,
  externalId: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repo: Repository<RoleEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<Role | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: ROLE_SELECT,
    });
    return row ? RoleMapper.to_domain(row) : null;
  }

  async find_by_internal_id(internal_id: number): Promise<Role | null> {
    const row = await this.repo.findOne({
      where: { id: internal_id },
      select: ROLE_SELECT,
    });
    return row ? RoleMapper.to_domain(row) : null;
  }

  async list(params: ListRolesParams): Promise<{ items: Role[]; total: number }> {
    const qb = this.repo.createQueryBuilder('r').select([
      'r.id',
      'r.externalId',
      'r.name',
      'r.description',
      'r.createdAt',
      'r.updatedAt',
    ]);
    if (params.name_contains !== undefined && params.name_contains !== '') {
      qb.andWhere('LOWER(r.name) LIKE LOWER(:n)', {
        n: `%${params.name_contains}%`,
      });
    }
    const total = await qb.clone().getCount();
    const skip = (params.page - 1) * params.limit;
    const rows = await qb
      .orderBy('r.id', 'ASC')
      .skip(skip)
      .take(params.limit)
      .getMany();
    return {
      items: rows.map((x) => RoleMapper.to_domain(x)),
      total,
    };
  }

  async create(props: CreateRoleProps): Promise<Role> {
    const rows = (await this.repo.query(
      `INSERT INTO transversal_schema.roles (name, description)
       VALUES ($1, $2)
       RETURNING id, external_id, name, description, created_at, updated_at`,
      [props.name, props.description],
    )) as Record<string, unknown>[];
    return RoleMapper.from_raw_row(rows[0]);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateRoleProps,
  ): Promise<Role | null> {
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
    if (patch.name !== undefined) {
      add('name', patch.name);
    }
    if (patch.description !== undefined) {
      add('description', patch.description);
    }
    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }
    columns.push(`"updated_at" = now()`);
    values.push(external_id);
    const rows = (await this.repo.query(
      `UPDATE transversal_schema.roles SET ${columns.join(', ')}
       WHERE external_id = $${i}::uuid
       RETURNING id, external_id, name, description, created_at, updated_at`,
      values,
    )) as Record<string, unknown>[];
    if (!rows?.length) {
      return null;
    }
    return RoleMapper.from_raw_row(rows[0]);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const rows = (await this.repo.query(
      `DELETE FROM transversal_schema.roles r
       WHERE r.external_id = $1::uuid
       AND NOT EXISTS (
         SELECT 1 FROM transversal_schema.users u WHERE u.role_id = r.id
       )
       RETURNING r.id`,
      [external_id],
    )) as Array<{ id: number }>;
    return rows.length > 0;
  }
}
