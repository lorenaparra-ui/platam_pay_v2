import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from '@app/transversal-data';
import type { StateRepository } from '@modules/transversal/catalog/domain/ports/state.repository.port';
import type {
  State,
  CreateStateProps,
  UpdateStateProps,
  ListStatesParams,
} from '@modules/transversal/catalog/domain/models/state.models';
import { StateMapper } from '@infrastructure/database/mappers/state.mapper';

const STATE_SELECT = {
  id: true,
  externalId: true,
  countryCode: true,
  stateName: true,
  stateCode: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormStateRepository implements StateRepository {
  constructor(
    @InjectRepository(StateEntity)
    private readonly repo: Repository<StateEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<State | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: STATE_SELECT,
    });
    return row ? StateMapper.to_domain(row) : null;
  }

  async list(params: ListStatesParams): Promise<{ items: State[]; total: number }> {
    const qb = this.repo.createQueryBuilder('s').select([
      's.id',
      's.externalId',
      's.countryCode',
      's.stateName',
      's.stateCode',
      's.createdAt',
      's.updatedAt',
    ]);
    if (params.country_code !== undefined && params.country_code !== '') {
      qb.andWhere('s.countryCode = :cc', { cc: params.country_code });
    }
    if (
      params.state_name_contains !== undefined &&
      params.state_name_contains !== ''
    ) {
      qb.andWhere('LOWER(s.stateName) LIKE LOWER(:sn)', {
        sn: `%${params.state_name_contains}%`,
      });
    }
    const total = await qb.clone().getCount();
    const skip = (params.page - 1) * params.limit;
    const rows = await qb
      .orderBy('s.countryCode', 'ASC')
      .addOrderBy('s.stateName', 'ASC')
      .skip(skip)
      .take(params.limit)
      .getMany();
    return {
      items: rows.map((x) => StateMapper.to_domain(x)),
      total,
    };
  }

  async create(props: CreateStateProps): Promise<State> {
    const rows = (await this.repo.query(
      `INSERT INTO transversal_schema.states (country_code, state_name, state_code)
       VALUES ($1, $2, $3)
       RETURNING id, external_id, country_code, state_name, state_code, created_at, updated_at`,
      [props.country_code, props.state_name, props.state_code],
    )) as Record<string, unknown>[];
    return StateMapper.from_raw_row(rows[0]);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateStateProps,
  ): Promise<State | null> {
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
    if (patch.country_code !== undefined) {
      add('country_code', patch.country_code);
    }
    if (patch.state_name !== undefined) {
      add('state_name', patch.state_name);
    }
    if (patch.state_code !== undefined) {
      add('state_code', patch.state_code);
    }
    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }
    columns.push(`"updated_at" = now()`);
    values.push(external_id);
    const rows = (await this.repo.query(
      `UPDATE transversal_schema.states SET ${columns.join(', ')}
       WHERE external_id = $${i}::uuid
       RETURNING id, external_id, country_code, state_name, state_code, created_at, updated_at`,
      values,
    )) as Record<string, unknown>[];
    if (!rows?.length) {
      return null;
    }
    return StateMapper.from_raw_row(rows[0]);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
