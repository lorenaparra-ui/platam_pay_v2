import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditFacilityEntity } from '@app/products-data';
import { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import {
  CreditFacility,
  CreateCreditFacilityProps,
  UpdateCreditFacilityProps,
} from '@modules/credit-facilities/domain/models/credit-facility.models';
import { CreditFacilityMapper } from '@infrastructure/database/mappers/credit-facility.mapper';

const CREDIT_FACILITY_SELECT = {
  id: true,
  externalId: true,
  contractId: true,
  state: true,
  totalLimit: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class TypeormCreditFacilityRepository implements CreditFacilityRepository {
  constructor(
    @InjectRepository(CreditFacilityEntity)
    private readonly repo: Repository<CreditFacilityEntity>,
  ) {}

  async find_by_external_id(external_id: string): Promise<CreditFacility | null> {
    const row = await this.repo.findOne({
      where: { externalId: external_id },
      select: CREDIT_FACILITY_SELECT,
    });
    return row ? CreditFacilityMapper.to_domain(row) : null;
  }

  async find_all(): Promise<CreditFacility[]> {
    const rows = await this.repo.find({
      select: CREDIT_FACILITY_SELECT,
      order: { id: 'ASC' },
    });
    return rows.map((r) => CreditFacilityMapper.to_domain(r));
  }

  async create(props: CreateCreditFacilityProps): Promise<CreditFacility> {
    const rows = await this.repo.query(
      `INSERT INTO products_schema.credit_facilities (
        external_id, contract_id, state, total_limit
      ) VALUES (
        COALESCE($1::uuid, gen_random_uuid()), $2, $3::products_schema.credit_facility_state, $4
      )
      RETURNING id, external_id, created_at, updated_at, contract_id, state, total_limit`,
      [
        props.external_id ?? null,
        props.contract_id,
        props.state,
        props.total_limit,
      ],
    );
    return CreditFacilityMapper.from_raw_row(rows[0] as Record<string, unknown>);
  }

  async update_by_external_id(
    external_id: string,
    patch: UpdateCreditFacilityProps,
  ): Promise<CreditFacility | null> {
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

    if (patch.contract_id !== undefined) {
      add('contract_id', patch.contract_id);
    }
    if (patch.state !== undefined) {
      add('state', patch.state);
    }
    if (patch.total_limit !== undefined) {
      add('total_limit', patch.total_limit);
    }

    if (columns.length === 0) {
      return this.find_by_external_id(external_id);
    }

    columns.push(`"updated_at" = now()`);
    values.push(existing.id);
    await this.repo.query(
      `UPDATE products_schema.credit_facilities SET ${columns.join(', ')} WHERE id = $${i}`,
      values,
    );

    return this.find_by_external_id(external_id);
  }

  async delete_by_external_id(external_id: string): Promise<boolean> {
    const result = await this.repo.delete({ externalId: external_id });
    return (result.affected ?? 0) > 0;
  }
}
