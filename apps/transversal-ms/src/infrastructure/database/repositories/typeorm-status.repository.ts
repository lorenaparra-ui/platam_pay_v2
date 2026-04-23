import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusEntity } from '@app/transversal-data';
import type { StatusRepository } from '@modules/transversal/domain/ports/catalog/status.repository.port';
import type {
  CatalogStatus,
  CreateStatusProps,
  UpdateStatusProps,
  ListStatusesParams,
} from '@modules/transversal/domain/models/status.models';
import { StatusMapper } from '@infrastructure/database/mappers/status.mapper';

const STATUS_SELECT = {
  id: true,
  externalId: true,
  entityType: true,
  code: true,
  displayName: true,
  description: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

const STATUS_RETURNING = `id, external_id, entity_type, code, display_name, description, is_active, created_at, updated_at`;

@Injectable()
export class TypeormStatusRepository implements StatusRepository {
  constructor(
    @InjectRepository(StatusEntity)
    private readonly repo: Repository<StatusEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<CatalogStatus | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: STATUS_SELECT,
    });
    return row ? StatusMapper.to_domain(row) : null;
  }

  async find_by_entity_type_and_code(
    entity_type: string,
    code: string,
  ): Promise<CatalogStatus | null> {
    const row = await this.repo.findOne({
      where: { entityType: entity_type, code },
      select: STATUS_SELECT,
    });
    return row ? StatusMapper.to_domain(row) : null;
  }

  async find_by_internal_id(internal_id: number): Promise<CatalogStatus | null> {
    const row = await this.repo.findOne({
      where: { id: internal_id },
      select: STATUS_SELECT,
    });
    return row ? StatusMapper.to_domain(row) : null;
  }

  async list(
    params: ListStatusesParams,
  ): Promise<{ items: CatalogStatus[]; total: number }> {
    const qb = this.repo.createQueryBuilder('s').select([
      's.id',
      's.externalId',
      's.entityType',
      's.code',
      's.displayName',
      's.description',
      's.isActive',
      's.createdAt',
      's.updatedAt',
    ]);
    if (params.entity_type !== undefined && params.entity_type !== '') {
      qb.andWhere('s.entityType = :et', { et: params.entity_type });
    }
    if (params.code_contains !== undefined && params.code_contains !== '') {
      qb.andWhere('LOWER(s.code) LIKE LOWER(:cc)', {
        cc: `%${params.code_contains}%`,
      });
    }
    if (
      params.display_name_contains !== undefined &&
      params.display_name_contains !== ''
    ) {
      qb.andWhere('LOWER(s.displayName) LIKE LOWER(:dn)', {
        dn: `%${params.display_name_contains}%`,
      });
    }
    if (params.is_active !== undefined) {
      qb.andWhere('s.isActive = :ia', { ia: params.is_active });
    }
    const total = await qb.clone().getCount();
    const unpaged = params.page === undefined && params.limit === undefined;
    const qb_page = qb.orderBy('s.id', 'ASC');
    if (!unpaged) {
      const page = params.page ?? 1;
      const limit = params.limit ?? 20;
      qb_page.skip((page - 1) * limit).take(limit);
    }
    const rows = await qb_page.getMany();
    return {
      items: rows.map((x) => StatusMapper.to_domain(x)),
      total,
    };
  }

  async create(props: CreateStatusProps): Promise<CatalogStatus> {
    const rows = (await this.repo.query(
      `INSERT INTO transversal_schema.catalog_status_types (
        entity_type, code, display_name, description, is_active, external_id
      ) VALUES ($1, $2, $3, $4, $5, gen_random_uuid())
      RETURNING ${STATUS_RETURNING}`,
      [
        props.entity_type,
        props.code,
        props.display_name,
        props.description,
        props.is_active,
      ],
    )) as Record<string, unknown>[];
    return StatusMapper.from_raw_row(rows[0]);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateStatusProps,
  ): Promise<CatalogStatus | null> {
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
    if (patch.entity_type !== undefined) {
      add('entity_type', patch.entity_type);
    }
    if (patch.code !== undefined) {
      add('code', patch.code);
    }
    if (patch.display_name !== undefined) {
      add('display_name', patch.display_name);
    }
    if (patch.description !== undefined) {
      add('description', patch.description);
    }
    if (patch.is_active !== undefined) {
      add('is_active', patch.is_active);
    }
    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }
    columns.push(`"updated_at" = now()`);
    values.push(external_id);
    const rows = (await this.repo.query(
      `UPDATE transversal_schema.catalog_status_types SET ${columns.join(', ')}
       WHERE external_id = $${i}::uuid
       RETURNING ${STATUS_RETURNING}`,
      values,
    )) as Record<string, unknown>[];
    if (!rows?.length) {
      return null;
    }
    return StatusMapper.from_raw_row(rows[0]);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const rows = (await this.repo.query(
      `DELETE FROM transversal_schema.catalog_status_types s
       WHERE s.external_id = $1::uuid
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.users u WHERE u.status_id = s.id)
       AND NOT EXISTS (SELECT 1 FROM transversal_schema.contract_signers cs WHERE cs.status_id = s.id)
       AND NOT EXISTS (SELECT 1 FROM suppliers_schema.partners p WHERE p.status_id = s.id)
       AND NOT EXISTS (
         SELECT 1 FROM suppliers_schema.credit_applications_bnpl ca
         WHERE ca.status_id = s.id OR ca.business_relation_id = s.id
       )
       AND NOT EXISTS (SELECT 1 FROM products_schema.credit_facilities cf WHERE cf.status_id = s.id)
       AND NOT EXISTS (
         SELECT 1 FROM products_schema.credit_applications ca
         WHERE s.entity_type = 'credit_applications'
           AND ca.status::text = s.code
       )
       AND NOT EXISTS (SELECT 1 FROM products_schema.categories c WHERE c.status_id = s.id)
       RETURNING s.id`,
      [external_id],
    )) as Array<{ id: number }>;
    return rows.length > 0;
  }
}
