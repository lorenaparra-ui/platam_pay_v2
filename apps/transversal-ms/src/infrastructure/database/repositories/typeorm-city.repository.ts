import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '@app/transversal-data';
import type { CityRepository } from '@modules/transversal/domain/ports/catalog/city.repository.port';
import type {
  City,
  CountryCatalogEntry,
  CreateCityProps,
  ListCitiesParams,
  ListDistinctCountriesParams,
  UpdateCityProps,
} from '@modules/transversal/domain/models/city.models';
import { CityMapper } from '@infrastructure/database/mappers/city.mapper';

const CITY_ROW_SQL = `c.id, c.external_id, c.country_name, c.country_code, c.state_name, c.state_code,
  c.city_name, c.currency_id, cur.external_id::text AS currency_external_id, c.created_at, c.updated_at`;

const CITY_FROM = `transversal_schema.cities c
  INNER JOIN transversal_schema.currencies cur ON cur.id = c.currency_id`;

@Injectable()
export class TypeormCityRepository implements CityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repo: Repository<CityEntity>,
  ) {}

  private build_where(
    params: ListCitiesParams,
    values: unknown[],
  ): { clause: string; next_idx: number } {
    const parts: string[] = [];
    let i = values.length + 1;
    if (params.country_code !== undefined && params.country_code !== '') {
      parts.push(`c.country_code = $${i}`);
      values.push(params.country_code);
      i += 1;
    }
    if (params.state_name !== undefined && params.state_name !== '') {
      parts.push(`c.state_name = $${i}`);
      values.push(params.state_name);
      i += 1;
    }
    if (
      params.city_name_contains !== undefined &&
      params.city_name_contains !== ''
    ) {
      parts.push(`LOWER(c.city_name) LIKE LOWER($${i})`);
      values.push(`%${params.city_name_contains}%`);
      i += 1;
    }
    return {
      clause: parts.length ? `WHERE ${parts.join(' AND ')}` : '',
      next_idx: i,
    };
  }

  async find_by_external_id(external_id: string): Promise<City | null> {
    const rows = (await this.repo.query(
      `SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} WHERE c.external_id = $1::uuid LIMIT 1`,
      [external_id],
    )) as Record<string, unknown>[];
    if (!rows?.length) {
      return null;
    }
    return CityMapper.from_raw_row(rows[0]);
  }

  async find_by_internal_id(internal_id: number): Promise<City | null> {
    const rows = (await this.repo.query(
      `SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} WHERE c.id = $1 LIMIT 1`,
      [internal_id],
    )) as Record<string, unknown>[];
    if (!rows?.length) {
      return null;
    }
    return CityMapper.from_raw_row(rows[0]);
  }

  async list(params: ListCitiesParams): Promise<{ items: City[]; total: number }> {
    const count_values: unknown[] = [];
    const { clause } = this.build_where(params, count_values);
    const count_rows = (await this.repo.query(
      `SELECT COUNT(*)::int AS n FROM transversal_schema.cities c ${clause}`,
      count_values,
    )) as Array<{ n: number }>;
    const total = count_rows[0]?.n ?? 0;

    const list_values: unknown[] = [];
    const { clause: list_clause, next_idx } = this.build_where(params, list_values);
    const unpaged = params.page === undefined && params.limit === undefined;
    let rows: Record<string, unknown>[];
    if (unpaged) {
      rows = (await this.repo.query(
        `SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} ${list_clause}
         ORDER BY c.id ASC`,
        list_values,
      )) as Record<string, unknown>[];
    } else {
      const page = params.page ?? 1;
      const limit = params.limit ?? 20;
      const offset = (page - 1) * limit;
      list_values.push(limit, offset);
      rows = (await this.repo.query(
        `SELECT ${CITY_ROW_SQL} FROM ${CITY_FROM} ${list_clause}
         ORDER BY c.id ASC LIMIT $${next_idx} OFFSET $${next_idx + 1}`,
        list_values,
      )) as Record<string, unknown>[];
    }
    return {
      items: rows.map((r) => CityMapper.from_raw_row(r)),
      total,
    };
  }

  async list_distinct_countries(
    params: ListDistinctCountriesParams,
  ): Promise<CountryCatalogEntry[]> {
    const values: unknown[] = [];
    let where = '';
    const q = params.country_name_contains?.trim();
    if (q) {
      where = `WHERE LOWER(c.country_name) LIKE LOWER($1)`;
      values.push(`%${q}%`);
    }
    const rows = (await this.repo.query(
      `SELECT DISTINCT c.country_name, c.country_code
       FROM transversal_schema.cities c
       ${where}
       ORDER BY c.country_name ASC, c.country_code ASC`,
      values,
    )) as Array<{ country_name: string; country_code: string }>;
    return rows.map((r) => ({
      country_name: r.country_name,
      country_code: r.country_code,
    }));
  }

  async create(props: CreateCityProps): Promise<City> {
    const rows = (await this.repo.query(
      `INSERT INTO transversal_schema.cities (
        country_name, country_code, state_name, state_code, city_name, currency_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
      [
        props.country_name,
        props.country_code,
        props.state_name,
        props.state_code,
        props.city_name,
        props.currency_id,
      ],
    )) as Array<{ id: number }>;
    const id = rows[0]?.id;
    if (id === undefined) {
      throw new Error('city insert failed');
    }
    const loaded = await this.find_by_internal_id(id);
    if (!loaded) {
      throw new Error('city load after insert failed');
    }
    return loaded;
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateCityProps,
  ): Promise<City | null> {
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
    if (patch.country_name !== undefined) {
      add('country_name', patch.country_name);
    }
    if (patch.country_code !== undefined) {
      add('country_code', patch.country_code);
    }
    if (patch.state_name !== undefined) {
      add('state_name', patch.state_name);
    }
    if (patch.state_code !== undefined) {
      add('state_code', patch.state_code);
    }
    if (patch.city_name !== undefined) {
      add('city_name', patch.city_name);
    }
    if (patch.currency_id !== undefined) {
      add('currency_id', patch.currency_id);
    }
    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }
    columns.push(`"updated_at" = now()`);
    values.push(external_id);
    await this.repo.query(
      `UPDATE transversal_schema.cities SET ${columns.join(', ')} WHERE external_id = $${i}::uuid`,
      values,
    );
    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const rows = (await this.repo.query(
      `DELETE FROM transversal_schema.cities c
       WHERE c.external_id = $1::uuid
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.persons p WHERE p.city_id = c.id)
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.businesses b WHERE b.city_id = c.id)
       RETURNING c.id`,
      [external_id],
    )) as Array<{ id: number }>;
    return rows.length > 0;
  }
}
